import { Add_CartItem_Failure, Add_CartItem_Request, Add_CartItem_Success, Delete_CartItem_Failure, Delete_CartItem_Request, Delete_CartItem_Success, Fetch_Cart_Request, Fetch_Cart_Success, Fetch_Restaurants_Failure } from "./actiontypes";

const initialState = {
  cart : [],
  loading: false,
  error: null,
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
      return{
        ...state,
        loading: false,
        cart: action.payload.cart
      }

    case Fetch_Cart_Success:
      return{
        ...state,
        loading: false,
        cart: action.payload.cart[0]
      }

    case Delete_CartItem_Success:
      return{
        ...state,
        loading: false,
        cart: action.payload.cart
      }

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