import { Add_Fav_Failure, Add_Fav_Request, Add_Fav_Success, Close_Auth,
  Current_Address,
  Delete_Address_Failure,
  Delete_Address_Request,
  Delete_Address_Success,
  Delete_Deliver_Address,
  Edit_Address,
  Edit_Otp_Failure,
  Edit_Otp_Request,
  Edit_Otp_Success,
  Edit_Success,
  Get_Address,
  Get_Cart_Login,
  Get_Cart_Signup,
  Get_Edit,
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
  Logout, 
  Save_Address_Failure, 
  Save_Address_Request, 
  Save_Address_Success, 
  Set_Deliver_Address, 
  Signup_Failure, 
  Signup_Request,
  Signup_Success,
  Update_Address_Failure,
  Update_Address_Request,
  Update_Address_Success,
  User_Button} from "./actiontypes";

  
  const initialState = {
    hiddenLogin: true,
    hiddenSignup: true,
    showOtp: false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    hideCartSign: true,
    hideCartLog: true,
    hiddenEdit: true,
    hiddenAddress: true,
    currentAddress: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).address && JSON.parse(localStorage.getItem('user')).address.length > 0 
        ? JSON.parse(localStorage.getItem('user')).address[0] 
        : null,
    editAddress: localStorage.getItem('editAddress') && JSON.parse(localStorage.getItem('editAddress')) ? JSON.parse(localStorage.getItem('editAddress')) : null,
    hiddenEditAddress: true,
    activeButton: 'Address',
    deliveryAddress: localStorage.getItem('deliveryAddress') && JSON.parse(localStorage.getItem('deliveryAddress')) ? JSON.parse(localStorage.getItem('deliveryAddress')) : null,
  }

function userReducer(state=initialState, action){
  switch(action.type){
    case Get_Login_Otp_Request:
    case Get_Signup_Otp_Request:
    case Signup_Request:
    case Login_Request:
    case Edit_Otp_Request:
    case Save_Address_Request:
    case Update_Address_Request:
    case Delete_Address_Request:
    case Add_Fav_Request:
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
        hiddenEdit: true,
        hiddenAddress: true,
        showOtp: false,
        hiddenEditAddress: true,
      }
    case Get_Edit:
      return{
        ...state,
        hiddenEdit: false
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
    case Logout:
      localStorage.removeItem('user');
      localStorage.removeItem('editAddress');
      localStorage.removeItem('deliveryAddress');
      localStorage.setItem('cartSynced', "false");
      return{
        ...state,
        user: null,  // This will ensure the Redux state is updated and the Navbar re-renders
        currentAddress: null,  // Clear the current address on logout
        editAddress: null,
        deliveryAddress: null
      }
    case Get_Address: 
      return{
        ...state,
        hiddenAddress: false,
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
    case Edit_Otp_Success:
      return{
        ...state,
        showOtp: true,
      }
    case Signup_Success:
      localStorage.setItem('user', JSON.stringify(action.payload.newUser));
      return{
        ...state,
        showOtp: false,
        user: action.payload.newUser,
        hiddenLogin: true,
        hiddenSignup: true,
      }
    case Login_Success:
      localStorage.setItem('user', JSON.stringify(action.payload.existingUser));
      return{
        ...state,
        showOtp: false,
        user: action.payload.existingUser,
        hiddenLogin: true,
        hiddenSignup: true,
      }
    case Edit_Success:
      localStorage.setItem('user', JSON.stringify(action.payload.updatedUser));
      return{
        ...state,
        showOtp: false,
        user: action.payload.updatedUser,
        hiddenEdit: true,
      }
    case Save_Address_Success:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return{
        ...state,
        user: action.payload.user,
        hiddenAddress: true,
      }
    case Current_Address:
      return{
        ...state,
        currentAddress: action.payload,
        hiddenAddress: true,
      }
    case Edit_Address:
      localStorage.setItem('editAddress', JSON.stringify(action.payload));
      return{
        ...state,
        editAddress: action.payload,
        hiddenEditAddress: false,
      }
    case Update_Address_Success:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return{
        ...state,
        user: action.payload.user,
        hiddenEditAddress: true,
      }
    case Delete_Address_Success:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return{
        ...state,
        user: action.payload.user,
      }
    case User_Button:
      return{
        ...state,
        activeButton: action.payload
      }
    case Set_Deliver_Address:
      localStorage.setItem('deliveryAddress', JSON.stringify(action.payload));
      return{
        ...state,
        deliveryAddress: action.payload
      }
    case Delete_Deliver_Address:
      localStorage.removeItem('deliveryAddress')
      return{
        ...state,
        deliveryAddress: null
      }
    case Add_Fav_Success:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return{
        ...state,
        user: action.payload.user,
      }
    case Get_Login_Otp_Failure:
    case Get_Signup_Otp_Failure:
    case Signup_Failure:
    case Login_Failure:
    case Edit_Otp_Failure:
    case Save_Address_Failure:
    case Update_Address_Failure:
    case Delete_Address_Failure:
    case Add_Fav_Failure:
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