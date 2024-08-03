import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuth, getLogin } from '../../Redux/userAction'

const Signup = () => {
  const {hiddenSignup} = useSelector(state=>state.userReducer)
  const dispatch = useDispatch()
  return (
    <div className="auth-container" style={{display: hiddenSignup? "none" : ""}}>
      <div className="auth-cut">
        <span onClick={()=>dispatch(closeAuth)}>X</span>
      </div>
      <div className="auth-type">
        <div className="auth-type-left">
          <span>Sign up</span>
          <span>or<span onClick={()=>dispatch(getLogin)}> login to your account</span></span>
          <div className="small-dash"></div>
        </div>
        <div className="auth-type-right">
        <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r' alt=''/>
        </div>
      </div>
      <div className="auth-fields">
        <input type="text" placeholder='Phone Number'/>
        <input type="text" placeholder='Name'/>
        <input type="text" placeholder='Email'/>
        <button>CONTINUE</button>
      </div>
    </div>
  )
}

export default Signup