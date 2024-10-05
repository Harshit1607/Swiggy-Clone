import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Navbar';
import { useNavigate } from 'react-router-dom';
import { getEdit } from '../../../Redux/userAction';
import EditContainer from '../EditContainer/EditCotainer';
import UserAddressContainer from '../UserAddress/UserAddressContainer';
import styles from './UserHome.module.css';
import UserButtonContainer from '../UserButtons/UserButtonContainer';

const UserHome = () => {
  const { user } = useSelector(state => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <>
      <EditContainer />
      <Navbar />
      <div className={styles.userMain}>
        <div className={styles.userInfoContainer}>
          <div className={styles.userInfo}>
            <div className={styles.userInfoName}>{user.name}</div>
            <div className={styles.userInfoOther}>
              <span>{user.phone}</span><span>.</span><span>{user.email}</span>
            </div>
          </div>
          <button className={styles.editInfo} onClick={() => dispatch(getEdit())}>Edit Profile</button>
        </div>
        <div className={styles.userDisplayContainer}>
          <div className={styles.userButtonSide}>
            <UserButtonContainer />
          </div>
          <div className={styles.userDisplayRight}>
            <UserAddressContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
