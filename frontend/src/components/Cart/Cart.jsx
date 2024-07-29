import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleRestaurant } from '../../Redux/restaurantActions';
import { fetchCart } from '../../Redux/cartActions';

const Cart = () => {
  const { cart, loading: cartLoading, error: cartError } = useSelector(state => state.cartReducer);
  const { singleRestaurant, loading: restaurantLoading, error: restaurantError } = useSelector(state => state.restaurantReducer);
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

  // if (cartLoading || restaurantLoading) {
  //   return <div className='loading'>Loading...</div>;
  // }

  // if (cartError || restaurantError) {
  //   return <div className='loading'>Error: {cartError || restaurantError}</div>;
  // }

  let deliverFee, platformFee, gst, toPay;
  if (cart) {
    deliverFee = 39;
    platformFee = 6;
    gst = 0.18 * platformFee + 0.18 * cart.totalPrice;
    toPay = deliverFee + platformFee + gst + cart.totalPrice;
  }

  return (
    cart && !cartLoading && !restaurantLoading ? 
      <div className="cart-main">
        <div className="cart-left"></div>
        <div className="cart-right">
          {singleRestaurant && (
            <div className='cart-rest-info'>
              <img src={singleRestaurant.image} alt={singleRestaurant.name} />
              <div className="cart-rest-name">
                <span>{singleRestaurant.name}</span>
              </div>
            </div>
          )}
          {cart.items && cart.items.map((item, index) => (
            <div className="cart-item-info" key={index}>
              <span>{item.item}</span>
              <div className='quantity-button'>{item.quantity}</div>
              <span>₹{item.price}</span>
            </div>
          ))}
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
            <div className="cart-bill-info to-pay">
              <span>To pay</span><span>₹{toPay.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    :
      <div className="cart-main">
        <div className='empty-cart'>
          <span>Your cart is empty</span>
          <button onClick={() => navigate('/')}>See restaurants near you</button>
        </div>
      </div>
  );
};

export default Cart;
