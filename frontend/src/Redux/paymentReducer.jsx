import { Create_Order_Failure, Create_Order_Request, Create_Order_Success, Make_Payment_Success } from "./actiontypes"

const initialState = {
  order: localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : null,
  userOrder: localStorage.getItem('userOrder') ? JSON.parse(localStorage.getItem('userOrder')) : null,
  paymentVerified: localStorage.getItem('paymentVerified') === 'true' ? true : false,
  makePayment: localStorage.getItem('paymentVerified') === 'true' ? true : false,
  loading: false,
  error: null,
}

function paymentReducer (state = initialState, action){
  switch(action.type){
    case Create_Order_Request:
      return{
        ...state,
        loading: true,
        error: null,
      };
    case Create_Order_Success:
      localStorage.setItem('order', JSON.stringify(action.payload.order))
      localStorage.setItem('userOrder', JSON.stringify(action.payload.userOrder))
      localStorage.setItem('makePayment', "true")
      localStorage.setItem('paymentVerified', "false")
      return{
        ...state,
        loading: false,
        error: null,
        order: action.payload.order,
        userOrder: action.payload.userOrder,
        makePayment: true,
        paymentVerified: false,
      };
    case Make_Payment_Success:
      console.log("Success")
      localStorage.removeItem('order');
      localStorage.setItem('userOrder', JSON.stringify(action.payload.userOrder))
      localStorage.setItem('paymentVerified', "true")
      localStorage.setItem('makePayment', "false")
      localStorage.removeItem('cart');
      return{
        ...state,
        loading:false,
        error: null,
        userOrder: action.payload.userOrder,
        order: null,
        paymentVerified: true,
        makePayment: false,
      }
    case Create_Order_Failure:
      return{
        ...state,
        loading: false,
        error: action.error,
      }
      default: 
        return state;
  }
}

export default paymentReducer