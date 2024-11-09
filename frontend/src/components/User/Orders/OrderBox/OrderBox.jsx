import React from 'react'
import styles from './orderBox.module.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleRestaurant } from '../../../../Redux/restaurantActions';
import { getOrder, reOrder } from '../../../../Redux/orderActions';
const OrderBox = ({order}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date(order.updatedAt);
  const options = {
    weekday: 'short',         // e.g., Thur
    year: 'numeric',         // e.g., 2024
    month: 'short',           // e.g., Nov
    day: 'numeric',          // e.g., 7
    hour: 'numeric',         // e.g., 10
    minute: 'numeric',       // e.g., 57
    hour12: true             // e.g., AM/PM format
  };

  function handleClick(id) {
    dispatch(getSingleRestaurant({ id }));
    navigate('/restaurant');
  }
  function handleReOrder(){
    dispatch(reOrder(order.userId, order.items, order.restaurantId));
    navigate('/cart');
  }
  
  // Convert to a readable string
  const formattedDate = date.toLocaleString('en-US', options);
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <div className={styles.topImage} onClick={()=>handleClick(order.restaurantId)}>
          <img src={order.restaurant.image} alt="img" />
        </div>
        <div className={styles.restInfo}>
          <span>{order.restaurant.name}</span>
          <div>
            <span>{order._id} | </span>
            <span>{formattedDate}</span>
          </div>
          <span onClick={()=>dispatch(getOrder(order))}>View Details</span>
        </div>
        <div className={styles.timeInfo}>
          <span>Delivered on {formattedDate}</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.itemInfo}>
          <span>{
            order.items.map(item=>(
              `${item.item} x ${item.quantity},`
            ))
            }</span>
          <span>Total Paid: ₹{order.amount}</span>
        </div>
        <div className={styles.buttonContainer}> 
          <button className={styles.reOrder} onClick={()=>{handleReOrder()}}>Re Order</button>
          <button className={styles.help}>Help</button>
        </div>
      </div>
    </div>
  )
}

export default OrderBox