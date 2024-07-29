import axios from 'axios'
import { Add_CartItem_Failure,
   Add_CartItem_Request,
   Add_CartItem_Success, 
   Delete_CartItem_Failure, 
   Delete_CartItem_Request, 
   Delete_CartItem_Success, 
   Fetch_Cart_Failure, 
   Fetch_Cart_Request, 
   Fetch_Cart_Success } from "./actiontypes";

const API_URL = 'http://localhost:5000/';

export const fetchCart = () => async (dispatch) => {
  dispatch({ type: Fetch_Cart_Request });
  try {
    const result = await axios.get(`${API_URL}cart`);
    dispatch({ type: Fetch_Cart_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Fetch_Cart_Failure, error: error.message });
  }
}

export const addToCart = ({Item, restId}) => async (dispatch) => {
  dispatch({ type: Add_CartItem_Request });
  try {
    const result = await axios.post(`${API_URL}cart/add`, { Item, restId });
    dispatch({ type: Add_CartItem_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Add_CartItem_Failure, error: error.message });
  }
}

export const deleteFromCart = ({Item, restId}) => async (dispatch) => {
  dispatch({ type: Delete_CartItem_Request });
  try {
    console.log({Item, restId})
    const result = await axios.delete(`${API_URL}cart/delete`, {data: {Item, restId} });
    dispatch({ type: Delete_CartItem_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Delete_CartItem_Failure, error: error.message })
  }
}
