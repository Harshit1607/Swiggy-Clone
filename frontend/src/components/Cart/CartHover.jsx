import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const CartHover = ({visibleCart}) => {
  const { cart, loading: cartLoading, error: cartError, toPay } = useSelector(state => state.cartReducer);
  const { singleRestaurant, loading: restaurantLoading, error: restaurantError } = useSelector(state => state.restaurantReducer);
  const navigate = useNavigate()
  console.log(cart);


  
  
  return (
    cart && cart.items && cart.items.length > 0 ? 
      <div className="cart-hover-div" style={{display: visibleCart ? "" : "none"}} >
      {singleRestaurant && (
        <div className='cart-rest-info'>
          <img src={singleRestaurant.image} alt={singleRestaurant.name} onClick={()=>{navigate('/restaurant');}} />
          <div className="cart-rest-name">
            <span onClick={()=>{navigate('/restaurant');}}>{singleRestaurant.name}</span>
            <div style={{display: "flex"}}><div className="small-dash"></div><div className="small-dash"></div></div>
            <a onClick={()=>{navigate('/restaurant');}}>See full menu</a>
          </div>
        </div>
      )}
      <div className="small-divider"></div>
      {cart.items && cart.items.map((item, index) => (
        <div className="cart-item-info" key={index}>
          <span>{item.item.substring(0, 20) + '...'}</span>
          <span>₹{item.price}</span>
        </div>
      ))}
      <div className="small-dashed-divider"></div>
      <div className="cart-hover-total">
        <span>Sub Total</span> <span>₹{cart.totalPrice}</span>
      </div>
      <button onClick={()=>{navigate('/cart');}}>Checkout</button>
    </div>
    : 
    <div className="cart-hover-div" style={{display: visibleCart ? "" : "none"}} >
      <span>Cart Empty</span>
      <span>
        <span>Good Food is always cooking!</span>
        <span>Go ahead, Order some yummy items from menu</span>
      </span>
    </div>
  )
}

export default CartHover