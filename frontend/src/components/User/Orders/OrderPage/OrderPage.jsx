import React from 'react'
import styles from './orderPage.module.css'
import OrderBox from '../OrderBox/OrderBox';
import {useSelector} from 'react-redux';

const OrderPage = () => {
  const {orders} = useSelector(state=>state.OrderReducer);
  
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <span>Past Orders</span>
      </div>
      {orders.map((data, index)=>(
        <OrderBox order={data} key={index}/>
      ))}
    </div>
  )
}

export default OrderPage