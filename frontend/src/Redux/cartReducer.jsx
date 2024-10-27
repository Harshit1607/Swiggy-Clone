import { Add_CartItem_Failure, Add_CartItem_Request, Add_CartItem_Success, Delete_CartItem_Failure, Delete_CartItem_Request, Delete_CartItem_Success, Fetch_Cart_Request, Fetch_Cart_Success, Fetch_Restaurants_Failure } from "./actiontypes";

const initialState = {
  cart : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  loading: false,
  error: null,
  deliverFee : 39,
  platformFee : 6,
  gst : 0,
  toPay : 0,
}

function cartReducer(state=initialState, action){
  switch(action.type){
    case Add_CartItem_Request:
    case Fetch_Cart_Request:
    case Delete_CartItem_Request:
      return{
        ...state,
        loading: true,
        error: null,
      }
    case Add_CartItem_Success:
      const updatedCart = action.payload.cart;
      const updatedGst = 0.18 * updatedCart.totalPrice;
      const updatedToPay = state.deliverFee + state.platformFee + updatedGst + updatedCart.totalPrice;

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return {
        ...state,
        loading: false,
        cart: updatedCart,
        gst: updatedGst,
        toPay: updatedToPay,
      };
    case Fetch_Cart_Success:
      const newCart = action.payload.cart[0];
      const newGst = 0.18 * newCart.totalPrice;
      const newToPay = state.deliverFee + state.platformFee + newGst + newCart.totalPrice;

      localStorage.setItem('cart', JSON.stringify(newCart));

      return {
        ...state,
        loading: false,
        cart: newCart,
        gst: newGst,
        toPay: newToPay,
      };

    case Delete_CartItem_Success:
      const newCartAfterDelete = action.payload.cart;
      const newGstAfterDelete = 0.18 * newCartAfterDelete.totalPrice;
      const newToPayAfterDelete = state.deliverFee + state.platformFee + newGstAfterDelete + newCartAfterDelete.totalPrice;

      localStorage.setItem('cart', JSON.stringify(newCartAfterDelete));

      return {
        ...state,
        loading: false,
        cart: newCartAfterDelete,
        gst: newGstAfterDelete,
        toPay: newToPayAfterDelete,
      };

    case Add_CartItem_Failure:
    case Fetch_Restaurants_Failure:
    case Delete_CartItem_Failure:
      return{
        ...state,
        loading: false,
        error: action.error,
      }
    default: 
      return state;
  }
}

export default cartReducer