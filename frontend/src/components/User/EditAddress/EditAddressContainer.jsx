import React, {useEffect, useState} from 'react';
import styles from './EditAddressContainer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeAuth, updateAddress } from '../../../Redux/userAction';

const EditAddressContainer = () => {
  const {editAddress, hiddenEditAddress, user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  
  const [newAddress, setNewAddress] = useState(editAddress && editAddress.address? editAddress.address : '');
  const [name, setName] = useState(editAddress && editAddress.addressName ?editAddress.addressName : '');

  useEffect(()=>{
    if(editAddress.addressName && editAddress.address){setting();}
  }, [editAddress, dispatch])

  const setting = () => {
    setName(editAddress.addressName)
    setNewAddress(editAddress.address)
  }

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAddress = (e) => {
    setNewAddress(e.target.value);
  };
  
  return (
    editAddress ? <div className={styles.authContainer} style={{ display: hiddenEditAddress ? 'none' : '' }}>
      <div className={styles.authCut}>
        <span onClick={()=>dispatch(closeAuth())}>X</span><span>Save Delivery Address</span>
      </div>
      <div className={styles.authFields}>
        <input placeholder='Address...' value={newAddress} onChange={handleAddress}/>
        <input placeholder='Name...' value={name} onChange={handleName}/>
        <button onClick={()=>dispatch(updateAddress(editAddress, user._id, newAddress, name))}>Save Address & Proceed</button>
      </div>
    </div> : null
  )
}

export default EditAddressContainer