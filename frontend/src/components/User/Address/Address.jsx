import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeAuth, currentAddress, saveAddress } from '../../../Redux/userAction';
import styles from './Address.module.css';

const Address = () => {
  const { hiddenAddress, user } = useSelector(state => state.userReducer);
  const [address, showAddress] = useState(false);
  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState('');
  const [name, setName] = useState('');


  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAddress = (e) => {
    setNewAddress(e.target.value);
  };

  const handleContinue = () => {
    const regex = /^$/;
    if (regex.test(name) || regex.test(newAddress)) {
      alert('Input fields cannot be empty');
      return;
    }
    dispatch(saveAddress(newAddress, name, user._id));
  };

  return (
    <div className={styles.authContainer} style={{ display: hiddenAddress ? 'none' : '' }}>
      <div className={styles.authCut}>
        <span onClick={() => dispatch(closeAuth())}>X</span>
      </div>
      <div className={styles.authFields}>
        {address ? (
          <>
            <input placeholder='Address...' value={newAddress} onChange={handleAddress} />
            <input placeholder='Name...' value={name} onChange={handleName} />
            <button onClick={handleContinue}>Add Address</button>
          </>
        ) : (
          <button onClick={() => showAddress(true)}>Add Address</button>
        )}
      </div>
      <div className={styles.savedAddressContainer}>
        <span>Saved Addresses</span>
        {user && user.address && user.address.length > 0 ? user.address.map((data, index) => (
          <div className={styles.savedAddresses} key={index} onClick={() => dispatch(currentAddress(user.address[index]))}>
            <div className={styles.savedAddressLeft}></div>
            <div className={styles.savedAddressRight}>
              <span>{data.addressName}</span>
              <span>{data.address}</span>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
};

export default Address;
