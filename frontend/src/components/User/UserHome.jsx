import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/userAction';

const UserHome = () => {
  const {user} = useSelector(state=>state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Navbar />
      <div className="user-main">
        <div className='user-info-container'>
          <div className="user-info">
            <div className="user-info-name">{user.name}</div>
            <div className="user-info-other"><span>{user.phone}</span><span>.</span><span>{user.email}</span></div>
          </div>
          <button className="edit-info">Edit Profile</button>
        </div>
      </div>
    </>
    
  )
}

export default UserHome