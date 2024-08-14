import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleRestaurant } from '../../Redux/restaurantActions';
import { addToCart, deleteFromCart, fetchCart } from '../../Redux/cartActions';
import Navbar from '../Navbar';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import CartAccount from './CartAccount';

const Cart = () => {
  const { cart, loading: cartLoading, error: cartError, deliverFee, platformFee, gst, toPay } = useSelector(state => state.cartReducer);
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
    {(cart && !cartLoading && !restaurantLoading && cart.items ? cart.items.length > 0 : false)  ? 
      <div className="cart-main" style={!hiddenLogin || !hiddenSignup ? {overflow: "hidden", height: "calc(100vh - 120px)"} : null}>
        <div className="cart-left">
          <CartAccount />
          <div className="cart-delivery"></div>
          <div className="cart-payment"></div>
        </div>
        <div className="cart-right">
          {singleRestaurant && (
                <div className='cart-rest-info'>
                  <img src={singleRestaurant.image} alt={singleRestaurant.name} onClick={()=>{navigate('/restaurant');}} />
                  <div className="cart-rest-name">
                    <span onClick={()=>{navigate('/restaurant');}}>{singleRestaurant.name}</span>
                    <div style={{display: "flex"}}><div className="small-dash"></div><div className="small-dash"></div></div>
                  </div>
                </div>
              )}
          <div className="cart-right-1">
            {cart.items && cart.items.map((item, index) => (
              <div className="cart-item-info" key={index}>
                <span>{item.item.substring(0, 20) + '...'}</span>
                <div className='quantity-button'>
                  <button onClick={()=>{const Item = item;
                    const restId = cart.restaurantId;
                    dispatch(deleteFromCart({Item, restId}));
                  }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={()=>{const Item = item;
                    const restId = cart.restaurantId;
                    dispatch(addToCart({Item, restId}));
                  }}>+</button>
                </div>
                <span>₹{item.price}</span>
              </div>
            ))}
            
            <input className="cart-suggestion"placeholder='Any suggestions? We will pass it on..'/>

            <div className="cart-no-contact">
              <div className="no-contact-left">
                <input type="checkbox" />
              </div>
              <div className="no-contact-right">
                <span>Opt in for No-contact Delivery</span>
                <span>Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD)</span>
              </div>
            </div>
            
            <div className="cart-bill">
              <span>Bill Detail</span>
              <div className="cart-bill-info">
                <span>Items Total</span><span>₹{cart.totalPrice}</span>
              </div>
              <div className="cart-bill-info">
                <span>Delivery fee</span><span>₹{deliverFee}</span>
              </div>
              <div className="cart-bill-info">
                <span>Platform Fee</span><span>₹{platformFee}</span>
              </div>
              <div className="cart-bill-info">
                <span>Gst</span><span>₹{gst.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="cart-bill-info to-pay">
                <span>To pay</span><span>₹{toPay.toFixed(2)}</span>
          </div>
          <div className="cart-right-2">
            <div>
              <span>Review your order and address details to avoid cancellations</span>
              <span><span>Note:</span> If you cancel within 60 seconds of placing your order, a 100% refund will be issued. No refund for cancellations made after 60 seconds.
              </span>
              <span>Avoid cancellation as it leads to food wastage.</span>
            </div>
          </div>
        </div>
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
