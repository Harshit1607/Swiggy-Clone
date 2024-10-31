import React from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    localStorage.removeItem("paymentVerified")
    localStorage.removeItem("makePayment")
    localStorage.removeItem("userOrder")
    navigate('/')
  }
  return (
    <div>
      <button onClick={()=>handleClick()}>Return Home</button>
    </div>
  )
}

export default Payment