import axios from 'axios'
import { Close_Auth, Get_Login, Get_Login_Otp_Request, Get_Signup,  Get_Login_Otp_Success, Get_Login_Otp_Failure, Get_Signup_Otp_Request, Get_Signup_Otp_Success, Get_Signup_Otp_Failure, Signup_Request, Signup_Success, Signup_Failure, Login_Request, Login_Success, Login_Failure, Get_Cart_Login, Get_Cart_Signup, Logout, Get_Edit, Edit_Otp_Request, Edit_Otp_Success, Edit_Otp_Failure, Edit_Request, Edit_Success, Edit_Failure, Get_Address, Save_Address_Request, Save_Address_Failure, Save_Address_Success, Current_Address, Edit_Address, Update_Address_Request, Update_Address_Failure, Update_Address_Success, Delete_Address_Request, Delete_Address_Success, Delete_Address_Failure, User_Button, Set_Deliver_Address, Delete_Deliver_Address } from './actiontypes';

const API_URL = 'http://localhost:5000/';

export const getLogin = () => ({ type: Get_Login });

export const getSignup = () => ({ type: Get_Signup });

export const getCartLogin = () => ({ type: Get_Cart_Login });

export const getCartSignup = () => ({ type: Get_Cart_Signup });

export const closeAuth = () => ({ type: Close_Auth });

export const logout = () => ({type: Logout})

export const getEdit = () => ({type: Get_Edit});

export const getAddress = () => ({type: Get_Address});

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

export const getEditOtp = (email, phone) => async (dispatch) => {
  dispatch({type: Edit_Otp_Request});
  try {
    const result = await axios.post(`${API_URL}user/editOtp`, {email, phone});
    alert(result.data.message);
    if(result.data.show){
      dispatch({type: Edit_Otp_Success, payload: result.data});
    } 
  } catch (error) {
    dispatch({type: Edit_Otp_Failure, error: error.message});
  }
}

export const editUser = (email, phone, newEmail, newPhone, userOtp) => async (dispatch) => {
  dispatch({type: Edit_Request});
  try {
    const result = await axios.put(`${API_URL}user/editUser`, {email, phone, newEmail, newPhone, userOtp});
    alert(result.data.message);
    if(result.data.updatedUser){
      dispatch({type: Edit_Success, payload: result.data});
    } 
  } catch (error) {
    dispatch({type: Edit_Failure, error: error.message});
  }
}

export const saveAddress = (address, addressName, userId) => async (dispatch) => {
  dispatch({type: Save_Address_Request});
  try {
    const result = await axios.post(`${API_URL}user/saveAddress`, {address, addressName, userId});
    dispatch({type: Save_Address_Success, payload: result.data});
  } catch (error) {
    dispatch({type: Save_Address_Failure, error: error.message})
  }
}

export const currentAddress = (address) => ({type:Current_Address, payload: address});

export const editAddress = (address) => ({type:Edit_Address, payload: address});

export const updateAddress = (address, userId, newAddress, newName) => async (dispatch) => {
  dispatch({type: Update_Address_Request});
  try {
    const result = await axios.post(`${API_URL}user/updateAddress`, {address, userId, newAddress, newName});
    dispatch({type: Update_Address_Success, payload: result.data});
  } catch (error) {
    dispatch({type: Update_Address_Failure, error: error.message})
  }
}

export const deleteAddress = (address) => async (dispatch) => {
  dispatch({type: Delete_Address_Request});
  try {
    const result = await axios.post(`${API_URL}user/deleteAddress`, {address});
    dispatch({type: Delete_Address_Success, payload: result.data});
  } catch (error) {
    dispatch({type: Delete_Address_Failure, error: error.message})
  }
}

export const userButton = (data) => ({
  type: User_Button,
  payload: data
})

export const setDelivery = (data, time) => ({
  type: Set_Deliver_Address,
  payload: {data, time}
})

export const deleteDelivery = () => ({type: Delete_Deliver_Address})