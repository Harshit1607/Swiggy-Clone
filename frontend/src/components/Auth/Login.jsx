import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuth, getSignup } from '../../Redux/userAction'

const Login = () => {
  const {hiddenLogin} = useSelector(state=>state.userReducer)
  const dispatch = useDispatch()
  return (
    <div className="auth-container" style={{display: hiddenLogin? "none" : ""}}>
      <div className="auth-cut">
        <span onClick={()=>dispatch(closeAuth)}>X</span>
      </div>
      <div className="auth-type">
        <div className="auth-type-left">
          <span>Login</span>
          <span>or<span onClick={()=>dispatch(getSignup)}> Create Account</span></span>
          <div className="small-dash"></div>
        </div>
        <div className="auth-type-right">
          <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r' alt=''/>
        </div>
      </div>
      <div className="auth-fields">
        <input type="text" placeholder='Phone Number'/>
        <button>CONTINUE</button>
      </div>
    </div>
  )
}

export default Login