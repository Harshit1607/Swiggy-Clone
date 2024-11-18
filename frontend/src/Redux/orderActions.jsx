import axios from 'axios';
import { Fetch_Orders_Failure, Fetch_Orders_Request, Fetch_Orders_Success, Get_Order, Re_Order_Failure, Re_Order_Request, Re_Order_Success } from './actiontypes';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const fetchOrders = (userId) => async (dispatch) => {
  dispatch({type: Fetch_Orders_Request});
  try {
    
    const result = await axios.get(`${API_URL}orders/`, { params: { userId } });
    dispatch({ type: Fetch_Orders_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Fetch_Orders_Failure, error: error.message });
  }
}

export const reOrder = (userId, items, restaurantId) => async (dispatch) => {
  dispatch({type: Re_Order_Request});
  try {
    
    const result = await axios.get(`${API_URL}orders/reorder`, { params: { userId, items, restaurantId } });
    dispatch({ type: Re_Order_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Re_Order_Failure, error: error.message });
  }
}

export const getOrder = (order) => ({ type: Get_Order, payload: order });