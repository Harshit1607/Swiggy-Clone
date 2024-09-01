import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { currentAddress } from '../../Redux/userAction';

const UserAddressContainer = () => {
  const {hiddenAddress, user} = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();
  return (
    <div className="user-page-address-container">
      <span>Manage Addresses</span>
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
  )
}

export default UserAddressContainer