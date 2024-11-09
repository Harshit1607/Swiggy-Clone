import { Add_CartItem_Failure, Add_CartItem_Request, Add_CartItem_Success, Check_Cart_Expiration, Delete_CartItem_Failure, Delete_CartItem_Request, Delete_CartItem_Success, Fetch_Cart_Request, Fetch_Cart_Success, Fetch_Restaurants_Failure, Re_Order_Failure, Re_Order_Request, Re_Order_Success, Sync_Cart_Failure, Sync_Cart_Request, Sync_Cart_Success } from "./actiontypes";

const initialState = {
  cart : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  loading: false,
  error: null,
  deliverFee : 39,
  platformFee : 6,
  gst : 0,
  toPay : 0,
  cartSynced: localStorage.getItem('cartSynced') === 'true' ? true: false,
}

function cartReducer(state=initialState, action){
  switch(action.type){
    case Add_CartItem_Request:
    case Fetch_Cart_Request:
    case Delete_CartItem_Request:
    case Sync_Cart_Request:
    case Re_Order_Request:
      return{
        ...state,
        loading: true,
        error: null,
      };

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
      const newCart = action.payload.cart;
      let newGst = 0, newToPay = 0;
      if(newCart){
        newGst = 0.18 * newCart.totalPrice;
        newToPay = state.deliverFee + state.platformFee + newGst + newCart.totalPrice;
      }
      
      localStorage.setItem('cart', JSON.stringify(newCart));

      return {
        ...state,
        loading: false,
        cart: newCart,
        gst: newGst,
        toPay: newToPay,
      };

    case Delete_CartItem_Success:
      let  newCartAfterDelete = action.payload.cart;
      let newGstAfterDelete,newToPayAfterDelete;
      if(action.payload.cart){
        
      newGstAfterDelete = 0.18 * newCartAfterDelete.totalPrice;
      newToPayAfterDelete = state.deliverFee + state.platformFee + newGstAfterDelete + newCartAfterDelete.totalPrice;

      localStorage.setItem('cart', JSON.stringify(newCartAfterDelete));
      } else{
        
        newGstAfterDelete = 0;
        newToPayAfterDelete = 0;
        localStorage.removeItem('cart');
      }
      

      return {
        ...state,
        loading: false,
        cart: newCartAfterDelete,
        gst: newGstAfterDelete,
        toPay: newToPayAfterDelete,
      };

    case Check_Cart_Expiration:
      const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : "";
      if (cart) {
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        // Check if cart does not belong to a user and was not updated in the last 30 minutes
        if (!cart.userId && new Date(cart.updatedAt) < thirtyMinutesAgo) {
          localStorage.removeItem('cart'); // Remove from localStorage
          return {
            ...state,
            cart: [], // Clear cart in the state
            gst: 0,
            toPay: 0,
            loading: false
          };
        }
      }
      return state;

    case Sync_Cart_Success:
  
      localStorage.setItem('cartSynced', "true");
      const syncCart = action.payload.cart;
      const syncGst = 0.18 * syncCart.totalPrice;
      const syncToPay = state.deliverFee + state.platformFee + syncGst + syncCart.totalPrice;

      localStorage.setItem('cart', JSON.stringify(syncCart));
      

      return {
        ...state,
        loading: false,
        cartSynced: true,
        cart: syncCart,
        gst: syncGst,
        toPay: syncToPay,
      };
    
    case Re_Order_Success:
      const reCart = action.payload.cart;
      let reGst = 0, reToPay = 0;
      if(reCart){
        reGst = 0.18 * reCart.totalPrice;
        reToPay = state.deliverFee + state.platformFee + reGst + reCart.totalPrice;
      }
      
      localStorage.setItem('cart', JSON.stringify(reCart));

      return {
        ...state,
        loading: false,
        cart: reCart,
        gst: reGst,
        toPay: reToPay,
      };
       
    case Add_CartItem_Failure:
    case Fetch_Restaurants_Failure:
    case Delete_CartItem_Failure:
    case Sync_Cart_Failure:
    case Re_Order_Failure:
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