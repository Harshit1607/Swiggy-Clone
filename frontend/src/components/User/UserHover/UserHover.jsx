import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../Redux/userAction';
import styles from './UserHover.module.css';

const UserHover = ({ visibleUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <div className={styles.userHoverContainer} style={{ display: visibleUser ? '' : 'none' }}>
      <div className={styles.userHoverInfo} onClick={() => navigate('/user')}>
        <span>Profile</span>
      </div>
      <div className={styles.userHoverInfo} onClick={() => dispatch(logout())}>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default UserHover;
