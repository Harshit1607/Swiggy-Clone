import React from 'react'
import styles from './CartPayment.module.css'
import { useDispatch, useSelector } from 'react-redux';

const CartPayment = () => {
  const {deliveryAddress} = useSelector(state=>state.userReducer);

  return (
   deliveryAddress ?
   <div className={styles.CartPayment}>
    <button>PROCEED TO PAY</button>
   </div>
   :
   <div> Payment </div>
  )
}

export default CartPayment