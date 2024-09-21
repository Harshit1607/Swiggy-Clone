import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Otp from '../../../Utils/Otp/Otp';
import {
  getCartLogin,
  getCartSignup,
  login,
  signup,
  getLoginOtp,
  getSignupOtp,
} from '../../../Redux/userAction';
import styles from './CartAccount.module.css';

const CartAccount = () => {
  const { showOtp, hideCartSign, hideCartLog } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [userOtp, setUserOtp] = useState('');

  const handleEmail = (e) => {
    const text = e.target.value;
    setEmail(text);
  };
  const handleName = (e) => {
    const text = e.target.value;
    setName(text);
  };
  const handlePhone = (e) => {
    const text = e.target.value;
    setPhone(text);
  };
  const handleOtpChange = (fullOtp) => {
    setUserOtp(fullOtp);
  };
  const handleContinueLog = () => {
    const regex = /^$/;
    if (regex.test(email)) {
      alert('Enter a valid email address');
      return;
    }
    dispatch(getLoginOtp(email));
  };
  const handleVerifyLog = () => {
    dispatch(login(email, userOtp));
  };
  const handleContinueSign = () => {
    const regex = /^$/;
    if (regex.test(email) || regex.test(name) || regex.test(phone)) {
      alert('Enter valid details');
      return;
    }
    dispatch(getSignupOtp(email, phone, name));
  };
  const handleVerifySign = () => {
    dispatch(signup(email, phone, name, userOtp));
  };

  return (
    <div className={styles.cartAccount}>
      <div className={styles.cartAccountLeft}>
        <span>Account</span>
        <span>
          To place your order now, log in to your existing account or sign up.
        </span>
        {hideCartLog && hideCartSign ? (
          <div className={styles.cartAccountAuthButtons}>
            <button onClick={() => dispatch(getCartLogin())}>
              <span>Have an account</span>
              <span>Login</span>
            </button>
            <button onClick={() => dispatch(getCartSignup())}>
              <span>New to Swiggy?</span>
              <span>Signup</span>
            </button>
          </div>
        ) : hideCartLog ? (
          hideCartSign ? (
            <div className={styles.cartAccountAuthButtons}>
              <button onClick={() => dispatch(getCartLogin())}>
                <span>Have an account</span>
                <span>Login</span>
              </button>
              <button onClick={() => dispatch(getCartSignup())}>
                <span>New to Swiggy?</span>
                <span>Signup</span>
              </button>
            </div>
          ) : (
            <div className={styles.cartAuthContainer}>
              <span className={styles.cartAuthType}>
                Sign up
                <span onClick={() => dispatch(getCartLogin())}>
                  {' '}
                  or Log in to your account
                </span>
              </span>
              <input
                type="text"
                className={styles.cartAuthFields}
                placeholder="Phone Number"
                onChange={(e) => handlePhone(e)}
                value={phone}
              />
              <input
                type="text"
                className={styles.cartAuthFields}
                placeholder="Name"
                onChange={(e) => handleName(e)}
                value={name}
              />
              <input
                type="text"
                className={styles.cartAuthFields}
                placeholder="Email"
                onChange={(e) => handleEmail(e)}
                value={email}
              />
              {showOtp ? <Otp length={4} handleOtpChange={handleOtpChange} /> : null}
              <button
                className={styles.cartAuthButton}
                onClick={
                  showOtp
                    ? () => handleVerifySign()
                    : () => handleContinueSign()
                }
              >
                {showOtp ? 'VERIFY OTP' : 'SIGNUP'}
              </button>
            </div>
          )
        ) : (
          <div className={styles.cartAuthContainer}>
            <span className={styles.cartAuthType}>
              Enter login details
              <span onClick={() => dispatch(getCartSignup())}>
                {' '}
                or Create Account
              </span>
            </span>
            <input
              type="text"
              className={styles.cartAuthFields}
              placeholder="Email"
              onChange={(e) => handleEmail(e)}
              value={email}
            />
            {showOtp ? <Otp length={4} handleOtpChange={handleOtpChange} /> : null}
            <button
              className={styles.cartAuthButton}
              onClick={
                showOtp ? () => handleVerifyLog() : () => handleContinueLog()
              }
            >
              {showOtp ? 'VERIFY OTP' : 'LOGIN'}
            </button>
          </div>
        )}
      </div>
      <div className={styles.cartAccountRight}>
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r"
          alt="img"
        />
      </div>
    </div>
  );
};

export default CartAccount;
