import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './CartHover.module.css'; // Import the CSS module
import { getCartRestaurant } from '../../../Redux/restaurantActions';

const CartHover = ({ visibleCart }) => {
  const { cart, loading: cartLoading, error: cartError, toPay } = useSelector(state => state.cartReducer);
  const { cartRestaurant, loading: restaurantLoading, error: restaurantError } = useSelector(state => state.restaurantReducer);
  const navigate = useNavigate();
  const dispatch= useDispatch();

  useEffect(() => {
    if (cart && cart.restaurantId && cart.restaurantId !== cartRestaurant._id) {
      const id = cart.restaurantId;
      dispatch(getCartRestaurant({ id }));
    }
  }, [cart?.restaurantId, dispatch]);
  
  return (
    cart && cart.items && cart.items.length > 0 ? 
      <div className={styles.cartHoverDiv} style={{ display: visibleCart ? "" : "none" }}>
        {cartRestaurant && (
          <div className={styles.cartRestInfo}>
            <img 
              src={cartRestaurant.image} 
              alt={cartRestaurant.name} 
              onClick={() => { navigate('/restaurant'); }} 
            />
            <div className={styles.cartRestName}>
              <span onClick={() => { navigate('/restaurant'); }}>{cartRestaurant.name}</span>
              <div style={{ display: "flex" }}>
                <div className={styles.smallDash}></div>
                <div className={styles.smallDash}></div>
              </div>
              <a onClick={() => { navigate('/restaurant'); }}>See full menu</a>
            </div>
          </div>
        )}
        <div className={styles.smallDivider}></div>
        {cart.items.map((item, index) => (
          <div className={styles.cartItemInfo} key={index}>
            <span>{item.item.substring(0, 25) + '...'}</span>
            <span>x{item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className={styles.smallDashedDivider}></div>
        <div className={styles.cartHoverTotal}>
          <span>Sub Total</span> <span>₹{cart.totalPrice}</span>
        </div>
        <button onClick={() => { navigate('/cart'); }}>Checkout</button>
      </div>
    :
    <div className={styles.cartHoverDiv} style={{ display: visibleCart ? "" : "none" }}>
      <span>Cart Empty</span>
      <span>
        <span>Good Food is always cooking!</span>
        <span>Go ahead, Order some yummy items from menu</span>
      </span>
    </div>
  );
};

export default CartHover;
