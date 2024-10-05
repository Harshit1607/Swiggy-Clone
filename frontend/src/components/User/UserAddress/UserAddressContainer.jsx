import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentAddress } from '../../../Redux/userAction';
import styles from './UserAddressContainer.module.css';

const UserAddressContainer = () => {
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  return (
    <div className={styles.userPageAddressContainer}>
      <span>Manage Addresses</span>
      <div className={styles.addressRow}>
        {user.address && user.address.length > 0 ? user.address.map((data, index) => (
          <div
            className={styles.savedAddresses}
            key={index}
            onClick={() => dispatch(currentAddress(user.address[index]))}
          >
            <div className={styles.savedAddressLeft}></div>
            <div className={styles.savedAddressRight}>
              <span>{data.addressName}</span>
              <span>{data.address}</span>
              <div className={styles.editAddress}>
                <span>Edit</span>
                <span>Delete</span>
                </div>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
};

export default UserAddressContainer;
