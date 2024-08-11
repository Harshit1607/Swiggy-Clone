import axios from 'axios'
import { Close_Auth, Get_Login, Get_Login_Otp_Request, Get_Signup,  Get_Login_Otp_Success, Get_Login_Otp_Failure, Get_Signup_Otp_Request, Get_Signup_Otp_Success, Get_Signup_Otp_Failure } from './actiontypes';

const API_URL = 'http://localhost:5000/';

export const getLogin = () => ({ type: Get_Login });

export const getSignup = () => ({ type: Get_Signup });

export const closeAuth = () => ({ type: Close_Auth });

export const getLoginOtp = (email) => async (dispatch) => {
  dispatch({type: Get_Login_Otp_Request});
  try {
    const result = await axios.post(`${API_URL}user/loginOtp`, {email});
    alert(result.data.message);
    if(result.data.length > 1){
      dispatch({type: Get_Login_Otp_Success, payload: result.data});
    }
  } catch (error) {
    dispatch({type: Get_Login_Otp_Failure, error: error.message});
  }
}

export const getSignupOtp = (email, phone, name) => async (dispatch) => {
  dispatch({type: Get_Signup_Otp_Request});
  try {
    const result = await axios.post(`${API_URL}user/signupOtp`, {email, phone, name});
    alert(result.data.message);
    console.log(result.data)
    if(result.data.otp){
      dispatch({type: Get_Signup_Otp_Success, payload: result.data});
    } 
  } catch (error) {
    dispatch({type: Get_Signup_Otp_Failure, error: error.message});
  }
}