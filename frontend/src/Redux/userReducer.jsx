import { Close_Auth,
  Get_Cart_Login,
  Get_Cart_Signup,
  Get_Login, 
  Get_Login_Otp_Failure, 
  Get_Login_Otp_Request, 
  Get_Login_Otp_Success, 
  Get_Signup, 
  Get_Signup_Otp_Failure, 
  Get_Signup_Otp_Request, 
  Get_Signup_Otp_Success, 
  Login_Failure, 
  Login_Request, 
  Login_Success, 
  Signup_Failure, 
  Signup_Request,
  Signup_Success} from "./actiontypes";

  
const initialState = {
  hiddenLogin: true,
  hiddenSignup: true,
  showOtp: false,
  user: null,
  hideCartSign: true,
  hideCartLog: true, 
}

function userReducer(state=initialState, action){
  switch(action.type){
    case Get_Login_Otp_Request:
    case Get_Signup_Otp_Request:
    case Signup_Request:
    case Login_Request:
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
    case Get_Cart_Login:
      return{
        ...state,
        hideCartLog: false,
        hideCartSign: true,
      }
    case Get_Cart_Signup:
      return{
        ...state,
        hideCartLog: true,
        hideCartSign: false,
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
    case Signup_Success:
      return{
        ...state,
        showOtp: false,
        user: action.payload.newUser
      }
    case Login_Success:
      return{
        ...state,
        showOtp: false,
        user: action.payload.existingUser
      }
    case Get_Login_Otp_Failure:
    case Get_Signup_Otp_Failure:
    case Signup_Failure:
    case Login_Failure:
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