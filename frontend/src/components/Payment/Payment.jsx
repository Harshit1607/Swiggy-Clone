import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import styles from './Payment.module.css'
import Icon from './Icon';

const Payment = () => {
  const {userOrder} = useSelector(state=>state.paymentReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    localStorage.removeItem("paymentVerified")
    localStorage.removeItem("makePayment")
    localStorage.removeItem("userOrder")
    navigate('/')
  }
  
  return (
    userOrder ?
    <div className={styles.main}>
      <div className={styles.small}>
        <div>
          <Icon />
        </div>
        <div>
          <span>Order id: {userOrder._id}</span>
          {/* <span>Payment id: {userOrder.paymentId}</span> */}
        </div>
        <button onClick={()=>handleClick()}>Return Home</button>
      </div>
    </div>
    : null
  )
}

export default Payment