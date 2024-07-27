import { Add_CartItem_Failure, Add_CartItem_Request, Add_CartItem_Success } from "./actiontypes";

const initialState = {
  cart : [],
  loading: false,
  error: null,
}

function cartReducer(state=initialState, action){
  switch(action.type){
    case Add_CartItem_Request:
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
    case Add_CartItem_Failure:
      return{
        ...state,
        loading: false,
        error: action.error,
      }
    default: 
      return state;
  }
}