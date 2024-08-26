import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { closeAuth, currentAddress, saveAddress } from '../../Redux/userAction'

const Address = () => {
  const {hiddenAddress, user} = useSelector(state=>state.userReducer);
  const [address, showAddress] = useState(false);
  const dispatch = useDispatch();
  const[newAddress, setNewAddress] = useState("");
  const[name, setName] = useState("");

  const handleName = (e) =>{
    const text = e.target.value;
    setName(text);
  }
  const handleAddress = (e) =>{
    const text = e.target.value;
    setNewAddress(text)
  }
  const handleContinue = () =>{
    const regex = /^$/;
    if(regex.test(name) || regex.test(address)){
      alert("Input fields can not be empty");
      return;
    }
    dispatch(saveAddress(newAddress, name, user._id));
  }

  return (
    <div className="auth-container address-container" style={{display: hiddenAddress? "none" : ""}}>
      <div className="auth-cut">
        <span onClick={()=>dispatch(closeAuth())}>X</span>
      </div>
      <div className="add-address auth-fields">
        {
          address?
          <>
          <input placeholder='Address...' value={newAddress} onChange={(e)=>handleAddress(e)}/>
          <input placeholder='Name...' value={name} onChange={(e)=>handleName(e)}/>
          <button onClick={()=>{handleContinue()}}>Add Address</button>
          </>
          :
          <button onClick={()=>showAddress(true)}>Add Address</button>
        }
      </div>
      <div className="saved-address-container">
        <span>Saved Addresses</span>
        
          {user.address && user.address.length > 0 ? user.address.map((data,index)=>{
            return(
              <div className='saved-addresses' onClick={()=>dispatch(currentAddress(user.address[index]))}>
              <div className="saved-address-left">

              </div>
              <div className="saved-address-right" key={index}>
                <span>{data.addressName}</span>
                <span>{data.address}</span>
              </div>
              </div>
            )
          }): null }
      </div>
    </div>
  )
}

export default Address