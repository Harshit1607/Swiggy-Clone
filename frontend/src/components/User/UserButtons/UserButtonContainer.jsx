import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserButtonContainer.module.css';
import { userButton } from '../../../Redux/userAction';
import { useNavigate } from 'react-router-dom';

const UserButtonContainer = () => {
  const {activeButton} = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.userButtonContainer}>
      <div className={`${styles.userButtons} ${activeButton === 'Address' ? styles.active : ''}`}
          itemID='Address' 
          onClick={(e)=>{dispatch(userButton(e.currentTarget.getAttribute('itemID')))}}>
        <span>Address</span>
      </div>
      <div className={`${styles.userButtons} ${activeButton === 'Orders' ? styles.active : ''}`} 
          itemID='Orders' 
          onClick={(e)=>{dispatch(userButton(e.currentTarget.getAttribute('itemID')))}}>
        <span>Orders</span>
      </div>
      <div className={`${styles.userButtons} ${activeButton === 'Favourite' ? styles.active : ''}`} 
          itemID='Favourite' 
          onClick={(e)=>{
            dispatch(userButton(e.currentTarget.getAttribute('itemID')))
            navigate('/favourites')
          }}>
        <span>Favourite</span>
      </div>
      <div className={`${styles.userButtons} ${activeButton === 'Settings' ? styles.active : ''}`} 
          itemID='Settings' 
          onClick={(e)=>{dispatch(userButton(e.currentTarget.getAttribute('itemID')))}}>
        <span>Settings</span>
      </div>
    </div>
  )
}

export default UserButtonContainer