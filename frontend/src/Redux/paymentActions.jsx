import axios from 'axios'
import { Create_Order_Failure, Create_Order_Request, Create_Order_Success, Make_Payment_Failure, Make_Payment_Request, Make_Payment_Success } from './actiontypes';
const API_URL = process.env.SERVER_URL;


export const createOrder = (amount, userId, deliveryAddress) => async (dispatch) => {
  dispatch({ type: Create_Order_Request });
  try {
    const result = await axios.post(`${API_URL}payment/createOrder`, {amount, userId, deliveryAddress});
    dispatch({ type: Create_Order_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Create_Order_Failure, error: error.message });
  }
}

export const verifyPayment = (orderId, paymentDetails) => async (dispatch) => {
  dispatch({ type: Make_Payment_Request });
  try {
    console.log(paymentDetails);
    const result = await axios.post(`${API_URL}payment/verify`, {orderId, paymentDetails});
    dispatch({ type: Make_Payment_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Make_Payment_Failure, error: error.message });
  }
}