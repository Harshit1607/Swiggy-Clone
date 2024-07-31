import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Cartdiv = () => {
  const {cart} = useSelector(state=>state.cartReducer);
  const{singleRestaurant} = useSelector(state=>state.restaurantReducer);
  const navigate = useNavigate();

  const thisCart = cart.restaurantId === singleRestaurant._id ? cart : null;

  useEffect(()=>{
    console.log('hi')
    if(cart.restaurantId === singleRestaurant._id && cart.items.length > 0){
      const menu = document.getElementsByClassName('menu-circle')[0]
      menu.style.bottom = '12%'
      const menubox = document.getElementsByClassName('hidden-menu-box')[0]
      menubox.style.bottom = '12%'
    }else{
      const menu = document.getElementsByClassName('menu-circle')[0]
      menu.style.bottom = '5%'
      const menubox = document.getElementsByClassName('hidden-menu-box')[0]
      menubox.style.bottom = '5%'
    }
  }, [cart]) 
  
  return (

    thisCart ? thisCart.items ? thisCart.items.length > 0 ? (
      <div className="cart-box" onClick={()=>{navigate('/cart')}}>
      <span>{thisCart ? thisCart.items  ? thisCart.items.length > 0 ? thisCart.items.length : null : null : null} Items added</span>
      <span>View Cart</span>
    </div>
    ) : null : null : null
    
  )
}

export default Cartdiv