import { Close_Auth, Get_Login, Get_Signup } from "./actiontypes";

const initialState = {
  hiddenLogin: true,
  hiddenSignup: true
}

function userReducer(state=initialState, action){
  switch(action.type){
    case Get_Login: 
      return{
        ...state,
        hiddenLogin: false,
        hiddenSignup: true
      }
    case Get_Signup:
      return{
        ...state,
        hiddenSignup: false,
        hiddenLogin: true,
      }
    case Close_Auth:
      return{
        ...state,
        hiddenLogin: true,
        hiddenSignup: true
      }
    default:
      return state;
  }
}

export default userReducer;