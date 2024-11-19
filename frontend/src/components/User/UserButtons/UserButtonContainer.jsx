import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserButtonContainer.module.css';
import { logout, userButton } from '../../../Redux/userAction';
import { useNavigate } from 'react-router-dom';
import cartsvg from '../../../assets/cart.svg';
import addresssvg from '../../../assets/address.svg';
import settingssvg from '../../../assets/settings.svg';
import favsvg from '../../../assets/fav.svg';
import logoutsvg from '../../../assets/logout.svg';

const UserButtonContainer = () => {
  const {activeButton} = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.userButtonContainer}>
      <div className={`${styles.userButtons} ${activeButton === 'Address' ? styles.active : ''}`}
          itemID='Address' 
          onClick={(e)=>{dispatch(userButton(e.currentTarget.getAttribute('itemID')))}}>
        <img src={addresssvg} alt=''/>
        <span>Address</span>
      </div>
      <div className={`${styles.userButtons} ${activeButton === 'Orders' ? styles.active : ''}`} 
          itemID='Orders' 
          onClick={(e)=>{dispatch(userButton(e.currentTarget.getAttribute('itemID')))}}>
            <img src={cartsvg} alt=''/>
        <span>Orders</span>
      </div>
      <div className={`${styles.userButtons} ${activeButton === 'Favourite' ? styles.active : ''}`} 
          itemID='Favourite' 
          onClick={(e)=>{
            dispatch(userButton(e.currentTarget.getAttribute('itemID')))
            navigate('/favourites')
          }}>
            <img src={favsvg} alt=''/>
        <span>Favourite</span>
      </div>
      <div className={`${styles.userButtons} ${activeButton === 'Settings' ? styles.active : ''}`} 
          itemID='Settings' 
          onClick={(e)=>{dispatch(userButton(e.currentTarget.getAttribute('itemID')))}}>
            <img src={settingssvg} alt=''/>
        <span>Settings</span>
      </div>
      <div className={`${styles.userButtons} ${activeButton === 'Logout' ? styles.active : ''}`} 
          itemID='Logout' 
          onClick={(e)=>{dispatch(logout())}}>
            <img src={logoutsvg} alt=''/>
        <span>Logout</span>
      </div>
    </div>
  )
}

export default UserButtonContainer