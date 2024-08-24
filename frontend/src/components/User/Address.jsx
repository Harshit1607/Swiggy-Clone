import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { closeAuth } from '../../Redux/userAction'

const Address = () => {
  const {hiddenAddress} = useSelector(state=>state.userReducer);
  const [address, showAddress] = useState(false);
  const dispatch = useDispatch();
  console.log("hi");
  return (
    <div className="auth-container address-container" style={{display: hiddenAddress? "none" : ""}}>
      <div className="auth-cut">
        <span onClick={()=>dispatch(closeAuth())}>X</span>
      </div>
      <div className="add-address auth-fields">
        {
          address?
          <>
          <input placeholder='Address...'/>
          <input placeholder='Name...'/>
          <button>Add Address</button>
          </>
          :
          <button onClick={()=>showAddress(true)}>Add Address</button>
        }
      </div>
      <div className="saved-address">
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Address