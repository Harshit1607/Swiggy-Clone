import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate, Outlet } from 'react-router-dom';

const PrivateUser = () => {
  const {user} = useSelector(state=>state.userReducer);
  return (
    user?
    <Outlet />
    :
    <Navigate to="/" />
  )
}

export default PrivateUser