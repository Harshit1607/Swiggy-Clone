import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserNav from '../UserNav/UserNav';
import { useNavigate } from 'react-router-dom';
import { getEdit } from '../../../Redux/userAction';
import EditContainer from '../EditContainer/EditCotainer';
import UserAddressContainer from '../UserAddress/UserAddressContainer';
import styles from './UserHome.module.css';
import UserButtonContainer from '../UserButtons/UserButtonContainer';
import EditAddressContainer from '../EditAddress/EditAddressContainer';
import UserSettings from '../UserSettings/UserSettings'
import { fetchOrders } from '../../../Redux/orderActions';
import OrderPage from '../Orders/OrderPage/OrderPage';
import OrderDetails from '../Orders/OrderDetails/OrderDetails';

const UserHome = () => {
  const { user, activeButton, hiddenEdit, hiddenEditAddress } = useSelector(state => state.userReducer);
  const { userOrder } = useSelector(state => state.paymentReducer);
  const {hiddenOrder} = useSelector(state=>state.OrderReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = user._id

  useEffect(()=>{
    const open = !hiddenEditAddress || !hiddenEdit || !hiddenOrder;
    if(open){
      document.body.style.overflow = 'hidden';
    }else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };

  }, [hiddenEditAddress, hiddenEdit, hiddenOrder]);

  useEffect(()=>{
    if (userId) {
      dispatch(fetchOrders(userId));
    }
  }, [userId, userOrder])

  useEffect(()=>{
      <UserAddressContainer />
  }, [user])
  
  return (
    <>
      <EditContainer />
      <EditAddressContainer />
      {!hiddenOrder ? <OrderDetails /> : null}
      <UserNav />
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
            {activeButton === 'Address' ?<UserAddressContainer />: null}
            {activeButton === 'Settings' ? <UserSettings /> : null}
            {activeButton === 'Orders' ? <OrderPage /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
