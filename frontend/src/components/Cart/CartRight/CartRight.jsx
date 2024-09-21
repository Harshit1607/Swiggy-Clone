import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, deleteFromCart } from '../../../Redux/cartActions';
import { getSingleRestaurant } from '../../../Redux/restaurantActions';

import styles from './CartRight.module.css'; // Import CSS module

const CartRight = () => {
  const { cart, deliverFee, platformFee, gst, toPay } = useSelector(state => state.cartReducer);
  const { singleRestaurant } = useSelector(state => state.restaurantReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart && cart.restaurantId) {
      const id = cart.restaurantId;
      dispatch(getSingleRestaurant({ id }));
    }
  }, [cart, dispatch]);

  return (
    <>
      {singleRestaurant && (
        <div className={styles.cartRestInfo}>
          <img src={singleRestaurant.image} alt={singleRestaurant.name} onClick={() => navigate('/restaurant')} />
          <div className={styles.cartRestName}>
            <span onClick={() => navigate('/restaurant')}>{singleRestaurant.name}</span>
            <div style={{ display: "flex" }}>
              <div className="small-dash"></div>
              <div className="small-dash"></div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.cartRight1}>
        {cart.items && cart.items.map((item, index) => (
          <div className={styles.cartItemInfo} key={index}>
            <span>{item.item.substring(0, 20) + '...'}</span>
            <div className={styles.quantityButton}>
              <button onClick={() => {
                dispatch(deleteFromCart({ Item: item, restId: cart.restaurantId }));
              }}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => {
                dispatch(addToCart({ Item: item, restId: cart.restaurantId }));
              }}>+</button>
            </div>
            <span>₹{item.price}</span>
          </div>
        ))}

        <input className={styles.cartSuggestion} placeholder='Any suggestions? We will pass it on..' />

        <div className={styles.cartNoContact}>
          <div className={styles.noContactLeft}>
            <input type="checkbox" />
          </div>
          <div className={styles.noContactRight}>
            <span>Opt in for No-contact Delivery</span>
            <span>Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD)</span>
          </div>
        </div>

        <div className={styles.cartBill}>
          <span>Bill Detail</span>
          <div className={styles.cartBillInfo}>
            <span>Items Total</span><span>₹{cart.totalPrice}</span>
          </div>
          <div className={styles.cartBillInfo}>
            <span>Delivery fee</span><span>₹{deliverFee}</span>
          </div>
          <div className={styles.cartBillInfo}>
            <span>Platform Fee</span><span>₹{platformFee}</span>
          </div>
          <div className={styles.cartBillInfo}>
            <span>Gst</span><span>₹{gst.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className={`${styles.cartBillInfo} ${styles.toPay}`}>
        <span>To pay</span><span>₹{toPay.toFixed(2)}</span>
      </div>
      <div className={styles.cartRight2}>
        <div>
          <span>Review your order and address details to avoid cancellations</span>
          <span><span>Note:</span> If you cancel within 60 seconds of placing your order, a 100% refund will be issued. No refund for cancellations made after 60 seconds.</span>
          <span>Avoid cancellation as it leads to food wastage.</span>
        </div>
      </div>
    </>
  );
}

export default CartRight;
