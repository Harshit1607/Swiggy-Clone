import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuth, getLogin, getSignupOtp, signup } from '../../Redux/userAction'
import Otp from '../../Utils/Otp'

const Signup = () => {
  const {hiddenSignup, showOtp} = useSelector(state=>state.userReducer)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [userOtp, setUserOtp] = useState("");

  const handleEmail = (e) =>{
    const text = e.target.value;
    setEmail(text)
  }
  const handleName = (e) =>{
    const text = e.target.value;
    setName(text)
  }
  const handlePhone = (e) =>{
    const text = e.target.value;
    setPhone(text)
  }
  const handleOtpChange = (fullOtp)=>{
    setUserOtp(fullOtp)
  }
  const handleContinue = () => {
    const regex = /^$/;
    if(regex.test(email) || regex.test(name) || regex.test(phone)){
      alert("Enter valid details");
      return;
    }
    dispatch(getSignupOtp(email, phone, name))
  }
  const handleVerify = () => {
    dispatch(signup(email, phone, name, userOtp))
  }

  return (
    <div className="auth-container" style={{display: hiddenSignup? "none" : ""}}>
      <div className="auth-cut">
        <span onClick={()=>dispatch(closeAuth())}>X</span>
      </div>
      <div className="auth-type">
        <div className="auth-type-left">
          <span>Sign up</span>
          <span>or<span onClick={()=>dispatch(getLogin())}> login to your account</span></span>
          <div className="small-dash"></div>
        </div>
        <div className="auth-type-right">
        <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r' alt=''/>
        </div>
      </div>
      <div className="auth-fields">
        <input type="text" placeholder='Phone Number' onChange={(e)=>{handlePhone(e)}} value={phone}/>
        <input type="text" placeholder='Name' onChange={(e)=>{handleName(e)}} value={name}/>
        <input type="text" placeholder='Email' onChange={(e)=>handleEmail(e)} value={email}/>
        {showOtp?<Otp length={4} handleOtpChange={handleOtpChange}/>: null}
        <button onClick={showOtp? ()=>{handleVerify()}:()=>{handleContinue()}}>{showOtp? "VERIFY OTP": "CONTINUE"}</button>
      </div>
    </div>
  )
}

export default Signup