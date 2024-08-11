import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuth, getLoginOtp, getSignup, login } from '../../Redux/userAction'
import Otp from '../../Utils/Otp'

const Login = () => {
  const {hiddenLogin, showOtp} = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  console.log(showOtp);
  
  const handleEmail = (e) =>{
    const text = e.target.value;
    setEmail(text)
  }
  const handleContinue = () => {
    const regex = /^$/;
    if(regex.test(email)){
      alert("Enter a valid email address");
      return;
    }
    dispatch(getLoginOtp(email))
  }
  const handleOtpChange = (fullOtp)=>{
    setUserOtp(fullOtp)
  }
  const handleVerify = () => {
    dispatch(login(email, userOtp))
  }

  return (
    <div className="auth-container" style={{display: hiddenLogin? "none" : ""}}>
      <div className="auth-cut">
        <span onClick={()=>dispatch(closeAuth())}>X</span>
      </div>
      <div className="auth-type">
        <div className="auth-type-left">
          <span>Login</span>
          <span> or<span onClick={()=>dispatch(getSignup())}> Create Account</span></span>
          <div className="small-dash"></div>
        </div>
        <div className="auth-type-right">
          <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r' alt=''/>
        </div>
      </div>
      <div className="auth-fields">
        <input type="email" placeholder='email' onChange={(e)=>handleEmail(e)} value={email}/>
        {showOtp ? <Otp length={4} handleOtpChange={handleOtpChange}/>: null}
        <button onClick={showOtp? ()=>{handleVerify()} :()=>{handleContinue()}}>{showOtp? "VERIFY OTP": "CONTINUE"}</button>
      </div>
    </div>
  )
}

export default Login