import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/userAction';

const UserHover = ({visibleUser}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  return (
    <div className="user-hover-container" style={{display: visibleUser ? "" : "none"}}>
      <div className="user-hover-info" onClick={()=>{navigate('/user')}}>
        <span>Profile</span>
      </div>
      <div className="user-hover-info" onClick={()=>dispatch(logout())}>
        <span>Logout</span>
      </div>
    </div>
  )
}

export default UserHover