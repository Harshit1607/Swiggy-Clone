import { Close_Auth,
  Get_Login, 
  Get_Login_Otp_Failure, 
  Get_Login_Otp_Request, 
  Get_Login_Otp_Success, 
  Get_Signup, 
  Get_Signup_Otp_Failure, 
  Get_Signup_Otp_Request, 
  Get_Signup_Otp_Success } from "./actiontypes";

  
const initialState = {
  hiddenLogin: true,
  hiddenSignup: true,
  showOtp: false,
}

function userReducer(state=initialState, action){
  switch(action.type){
    case Get_Login_Otp_Request:
    case Get_Signup_Otp_Request:
      return{
        ...state,
        loading: true,
        error: null,
        showOtp: false,
      }
    case Get_Login: 
      return{
        ...state,
        hiddenLogin: false,
        hiddenSignup: true,
        showOtp: false,
      }
    case Get_Signup:
      return{
        ...state,
        hiddenSignup: false,
        hiddenLogin: true,
        showOtp: false,
      }
    case Close_Auth:
      return{
        ...state,
        hiddenLogin: true,
        hiddenSignup: true,
        showOtp: false,
      }
    case Get_Login_Otp_Success:
      return{
        ...state,
        showOtp: true,
      }
    case Get_Signup_Otp_Success:
      return{
        ...state,
        showOtp: true,
      }
    case Get_Login_Otp_Failure:
    case Get_Signup_Otp_Failure:
      return {
        ...state,
        loading: false,
        error: action.error,
        showOtp: false,
      };
    default:
      return state;
  }
}

export default userReducer;