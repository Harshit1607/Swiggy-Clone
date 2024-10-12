import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentAddress, deleteAddress, editAddress } from '../../../Redux/userAction';
import styles from './UserAddressContainer.module.css';

const UserAddressContainer = () => {
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [Delete, setDelete] = useState(false);
  const deleteBoxRef = useRef(null); // Ref for the delete box

 

    // Add event listener when Delete is true
    useEffect(() => {
      if (Delete) {
        const handleClickOutside = (e) => {
          console.log(e.target);
          // Check if the click was outside the delete box
          if (deleteBoxRef.current && !deleteBoxRef.current.contains(e.target)) {
            setDelete(false); // Close delete box
          }
        };
  
        // Add the event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);
  
        // Cleanup the event listener on component unmount or when Delete is false
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [Delete]);

  return (
    <>
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
                <span onClick={()=>dispatch(editAddress(data))}>Edit</span>
                <span onClick={()=>{
                  setDelete(true);
                  setId(data._id)
                }}>Delete</span>
                </div>
            </div>
          </div>
        )) : null}
      </div>
    </div>
    { Delete ?
      <div className={styles.deleteBox} ref={deleteBoxRef}>
        <span>Are You sure You want to delete this address?</span>
        <div>
          <button onClick={()=>setDelete(false)}>Cancel</button>
          <button onClick={()=>{
            dispatch(deleteAddress(id));
            setDelete(false);
            }}>Delete</button>
        </div>
      </div>
      : null
    }
    </>
  );
};

export default UserAddressContainer;
