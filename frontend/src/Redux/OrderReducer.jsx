import {Close_Auth, Fetch_Orders_Failure, Fetch_Orders_Request, Fetch_Orders_Success, Get_Order } from "./actiontypes";

const initialState = {
  orders: localStorage.getItem('Orders') ? JSON.parse(localStorage.getItem('Orders')) : [],
  loading: false,
  error: null,
  hiddenOrder: true,
  currentOrder: null,
}

function orderReducer (state = initialState, action){
  switch(action.type){
    case Fetch_Orders_Request:
      return{
        ...state,
        loading: true,
        error: null,
      };
    case Fetch_Orders_Success:
      const orders = action.payload.orders || []; // Fallback to an empty array if undefined
      console.log(orders)
      localStorage.setItem('Orders', JSON.stringify(orders));
      return{
        ...state,
        orders,
        loading: false,
        error: null
      }
    case Get_Order:
      return{
        ...state,
        hiddenOrder: false,
        currentOrder: action.payload,
      }
    case Close_Auth:
      return{
        ...state,
        hiddenOrder: true,
        order: null
      }
    case Fetch_Orders_Failure:
      return{
        ...state,
        loading: false,
        error: action.error,
      }
      default: 
        return state;
  }
}

export default orderReducer
