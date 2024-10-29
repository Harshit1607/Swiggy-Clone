import axios from 'axios'
import { Add_CartItem_Failure,
   Add_CartItem_Request,
   Add_CartItem_Success, 
   Check_Cart_Expiration, 
   Delete_CartItem_Failure, 
   Delete_CartItem_Request, 
   Delete_CartItem_Success, 
   Fetch_Cart_Failure, 
   Fetch_Cart_Request, 
   Fetch_Cart_Success, 
   Sync_Cart_Failure, 
   Sync_Cart_Request,
   Sync_Cart_Success} from "./actiontypes";

const API_URL = 'http://localhost:5000/';

export const fetchCart = ({cartId, userId}) => async (dispatch) => {
  dispatch({ type: Fetch_Cart_Request });
  try {
    const result = await axios.get(`${API_URL}cart`,{
      params: { cartId, userId }, // Send as query parameters
    });
    dispatch({ type: Fetch_Cart_Success, payload: result.data });
  } catch (error) {
    console.log(error);
    
    dispatch({ type: Fetch_Cart_Failure, error: error.message });
  }
}

export const addToCart = ({Item, restId, cartId, userId}) => async (dispatch) => {
  dispatch({ type: Add_CartItem_Request });
  try {
    const result = await axios.post(`${API_URL}cart/add`, { Item, restId, cartId, userId });
    dispatch({ type: Add_CartItem_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Add_CartItem_Failure, error: error.message });
  }
}

export const deleteFromCart = ({Item, restId, cartId, userId}) => async (dispatch) => {
  dispatch({ type: Delete_CartItem_Request });
  try {
    const result = await axios.delete(`${API_URL}cart/delete`, {data: {Item, restId, cartId, userId} });
    dispatch({ type: Delete_CartItem_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Delete_CartItem_Failure, error: error.message })
  }
}

export const cartExpiration = () => ({type: Check_Cart_Expiration})

export const cartSync = ({userId, cartId}) => async (dispatch) => {
  dispatch({type: Sync_Cart_Request})
  try {
    const result = await axios.post(`${API_URL}cart/sync`, {userId, cartId})
    dispatch({ type: Sync_Cart_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Sync_Cart_Failure, error: error.message });
  }
}