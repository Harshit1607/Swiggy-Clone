import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAuth, editUser, getEditOtp } from '../../../Redux/userAction';
import Otp from '../../../Utils/Otp/Otp';
import styles from './EditContainer.module.css';

const EditContainer = () => {
  const { hiddenEdit, user, showOtp } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [userOtp, setUserOtp] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOtpChange = (fullOtp) => {
    setUserOtp(fullOtp);
  };

  const handleContinue = () => {
    const regex = /^$/;
    if (regex.test(email) || regex.test(phone)) {
      alert('Enter valid details');
      return;
    }
    dispatch(getEditOtp(email, phone));
  };

  const handleVerify = () => {
    dispatch(editUser(user.email, user.phone, email, phone, userOtp));
  };

  return (
    <div className={styles.authContainer} style={{ display: hiddenEdit ? 'none' : '' }}>
      <div className={styles.authCut}>
        <span onClick={() => dispatch(closeAuth())}>X</span><span>Edit Profile</span>
      </div>
      <div className={styles.authFields}>
        <span>Phone Number</span>
        {showPhone ? (
          <>
            <input type="text" placeholder="new phone number" value={phone} onChange={handlePhone} />
            {showOtp ? <Otp length={4} handleOtpChange={handleOtpChange} /> : null}
            <button onClick={showOtp ? handleVerify : handleContinue}>
              {showOtp ? 'VERIFY OTP' : 'CONTINUE'}
            </button>
          </>
        ) : (
          <div className={styles.changeFields}>
            <span>{user.phone}</span>
            <span onClick={() => setShowPhone(true)}>Change</span>
          </div>
        )}
      </div>
      <div className={styles.authFields}>
        <span>Email Address</span>
        {showEmail ? (
          <>
            <input type="email" placeholder="new email" value={email} onChange={handleEmail} />
            {showOtp ? <Otp length={4} handleOtpChange={handleOtpChange} /> : null}
            <button onClick={showOtp ? handleVerify : handleContinue}>
              {showOtp ? 'VERIFY OTP' : 'CONTINUE'}
            </button>
          </>
        ) : (
          <div className={styles.changeFields}>
            <span>{user.email}</span>
            <span onClick={() => setShowEmail(true)}>Change</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditContainer;
