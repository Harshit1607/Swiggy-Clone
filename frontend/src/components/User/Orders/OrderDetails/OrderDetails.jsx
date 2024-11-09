import React from 'react'
import styles from'./OrderDetails.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuth } from '../../../../Redux/userAction'


const OrderDetails = () => {
  const {currentOrder: order, hiddenOrder} = useSelector(state=>state.OrderReducer)
  const {deliverFee, platformFee} = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()

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
  const formattedDate = date.toLocaleString('en-US', options);

  const orderItemsTotal = order.items.reduce((total, item) => {
    const itemPrice = parseFloat(item.price);
    const itemQuantity = parseInt(item.quantity);
    const itemTotal = itemPrice * itemQuantity;
  
    if (isNaN(itemTotal)) {
      throw new Error(`Invalid item total: ${itemTotal}`);
    }
  
    return total + itemTotal;
  }, 0);
  const taxes = (0.18*(orderItemsTotal)).toFixed(2)
  return (
    <div className={styles.main} style={{ display: hiddenOrder ? 'none' : '' }}>
      <div className={styles.authCut}>
        <span onClick={()=>dispatch(closeAuth())} >X</span><span>Order {order._id}</span>
      </div>
      <div className={styles.deliveryInfo}>
        <span>{order.restaurant.name}</span>
        <span></span>
        <span>Delivered on {formattedDate}</span>
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.items}>
          <span>{order.items.length} Items</span>
          {
            order.items.map(item=>(
              <span className={styles.itemName}>
                <span>{item.item} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </span>
            ))
          }
        </div>
        <div className={styles.fees}>
          <div>
            <span>Item total</span>
            <span>₹{orderItemsTotal}</span>
          </div>
          <div>
            <span>Platform fee</span>
            <span>₹{platformFee}</span>
          </div>
          <div>
            <span>Delivery fee</span>
            <span>₹{deliverFee}</span>
          </div>
          <div>
            <span>Taxes</span>
            <span>₹{taxes}</span>
          </div>
        </div>
        <div className={styles.total}>
          <span>Paid</span>
          <span>BILL TOTAL</span>
          <span>{order.amount}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails