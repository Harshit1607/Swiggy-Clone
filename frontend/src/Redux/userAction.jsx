import axios from 'axios'
import { Close_Auth, Get_Login, Get_Login_Otp_Request, Get_Signup,  Get_Login_Otp_Success, Get_Login_Otp_Failure, Get_Signup_Otp_Request, Get_Signup_Otp_Success, Get_Signup_Otp_Failure, Signup_Request, Signup_Success, Signup_Failure, Login_Request, Login_Success, Login_Failure, Get_Cart_Login, Get_Cart_Signup, Logout } from './actiontypes';

const API_URL = 'http://localhost:5000/';

export const getLogin = () => ({ type: Get_Login });

export const getSignup = () => ({ type: Get_Signup });

export const getCartLogin = () => ({ type: Get_Cart_Login });

export const getCartSignup = () => ({ type: Get_Cart_Signup });

export const closeAuth = () => ({ type: Close_Auth });

export const logout = () => ({type: Logout})

export const getLoginOtp = (email) => async (dispatch) => {
  dispatch({type: Get_Login_Otp_Request});
  try {
    const result = await axios.post(`${API_URL}user/loginOtp`, {email});
    alert(result.data.message);
    if(result.data.otp){
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
    if(result.data.otp){
      dispatch({type: Get_Signup_Otp_Success, payload: result.data});
    } 
  } catch (error) {
    dispatch({type: Get_Signup_Otp_Failure, error: error.message});
  }
}

export const login = (email, userOtp) => async (dispatch) => {
  dispatch({type: Login_Request});
  try {
    const result = await axios.post(`${API_URL}user/login`, {email, userOtp});
    alert(result.data.message);
    if(result.data.existingUser){
      dispatch({type: Login_Success, payload: result.data});
    }
  } catch (error) {
    dispatch({type: Login_Failure, error: error.message});
  }
}

export const signup = (email, phone, name, userOtp) => async (dispatch) => {
  dispatch({type: Signup_Request});
  try {
    const result = await axios.post(`${API_URL}user/signup`, {email, phone, name, userOtp});
    alert(result.data.message);
    console.log(result.data)
    if(result.data.newUser){
      dispatch({type: Signup_Success, payload: result.data});
    } 
  } catch (error) {
    dispatch({type: Signup_Failure, error: error.message});
  }
}