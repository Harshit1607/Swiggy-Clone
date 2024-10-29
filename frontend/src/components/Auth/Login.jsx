import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAuth, getLoginOtp, getSignup, login } from '../../Redux/userAction';
import Otp from '../../Utils/Otp/Otp';
import styles from './Auth.module.css'; // Importing modular CSS


const Login = () => {
  const { hiddenLogin, showOtp } = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

  
  const [email, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");

  const handleEmail = (e) => {
    const text = e.target.value;
    setEmail(text);
  };

  const handleContinue = () => {
    const regex = /^$/;
    if (regex.test(email)) {
      alert("Enter a valid email address");
      return;
    }
    dispatch(getLoginOtp(email));
  };

  const handleOtpChange = (fullOtp) => {
    setUserOtp(fullOtp);
  };

  const handleVerify = () => {
    dispatch(login(email, userOtp));
  };

  return (
    <div className={styles.authContainer} style={{ display: hiddenLogin ? "none" : "" }}>
      <div className={styles.authCut}>
        <span onClick={() => dispatch(closeAuth())}>X</span>
      </div>
      <div className={styles.authType}>
        <div className={styles.authTypeLeft}>
          <span>Login</span>
          <span> or <span onClick={() => dispatch(getSignup())}>Create Account</span></span>
          <div className="small-dash"></div>
        </div>
        <div className={styles.authTypeRight}>
          <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r' alt='' />
        </div>
      </div>
      <div className={styles.authFields}>
        <input type="email" placeholder='Email' onChange={handleEmail} value={email} />
        {showOtp ? <Otp length={4} handleOtpChange={handleOtpChange} /> : null}
        <button onClick={showOtp ? handleVerify : handleContinue}>{showOtp ? "VERIFY OTP" : "CONTINUE"}</button>
      </div>
    </div>
  );
};

export default Login;
