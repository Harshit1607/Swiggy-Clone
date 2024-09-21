import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../../../Redux/cartActions';
import Navbar from '../../Navbar';
import Login from '../../Auth/Login';
import Signup from '../../Auth/Signup';
import CartAccount from '../CartAccount/CartAccount';
import CartRight from '../CartRight/CartRight';
import CartAddress from '../CartAddress/CartAddress';
import CartPayment from '../CartPayment/CartPayment';

import styles from './Cart.module.css'; // Import the CSS module

const Cart = () => {
  const { cart, loading: cartLoading } = useSelector(state => state.cartReducer);
  const { user } = useSelector(state => state.userReducer);
  const { hiddenLogin, hiddenSignup } = useSelector(state => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <Login />
      <Signup />
      <Navbar />
      {(cart && !cartLoading && cart.items && cart.items.length > 0) ? (
        <div className={styles.cartMain} style={!hiddenLogin || !hiddenSignup ? { overflow: "hidden", height: "calc(100vh - 120px)" } : null}>
          <div className={styles.cartLeft}>
            {!user && <CartAccount />}
            <CartAddress />
            <CartPayment />
          </div>
          <div className={styles.cartRight}>
            <CartRight />
          </div>
        </div>
      ) : (
        <div className={styles.cartMain} style={!hiddenLogin || !hiddenSignup ? { overflow: "hidden", height: "calc(100vh - 120px)" } : null}>
          <div className={styles.emptyCart}>
            <span>Your cart is empty</span>
            <button className={styles.emptyCartButton} onClick={() => navigate('/')}>
              See restaurants near you
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
