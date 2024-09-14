import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleRestaurant } from '../../Redux/restaurantActions';
import { addToCart, deleteFromCart, fetchCart } from '../../Redux/cartActions';
import Navbar from '../Navbar';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import CartAccount from './CartAccount';
import CartRight from './CartRight';
import CartAddress from './CartAddress';
import CartPayment from './CartPayment';

const Cart = () => {
  const { cart, loading: cartLoading, error: cartError, deliverFee, platformFee, gst, toPay } = useSelector(state => state.cartReducer);
  const {user} = useSelector(state=>state.userReducer)
  const { singleRestaurant, loading: restaurantLoading, error: restaurantError } = useSelector(state => state.restaurantReducer);
  const {hiddenLogin, hiddenSignup} = useSelector(state => state.userReducer)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (cart && cart.restaurantId) {
      const id = cart.restaurantId
      dispatch(getSingleRestaurant({id}));
    }
  }, [cart, dispatch]);


  return (
    <>
    <Login />
    <Signup />
    <Navbar />
    {(cart && !cartLoading  && cart.items && cart.items.length > 0)  ? 
      <div className="cart-main" style={!hiddenLogin || !hiddenSignup ? {overflow: "hidden", height: "calc(100vh - 120px)"} : null}>
        <div className="cart-left">
          {user? null : <CartAccount />}
          <CartAddress />
          <CartPayment />
        </div>
        <CartRight />
      </div>
    :
      <div className="cart-main" style={!hiddenLogin || !hiddenSignup ? {overflow: "hidden", height: "calc(100vh - 120px)"} : null}>
        <div className='empty-cart'>
          <span>Your cart is empty</span>
          <button onClick={() => navigate('/')}>See restaurants near you</button>
        </div>
      </div>}
  </>
  );
};

export default Cart;
