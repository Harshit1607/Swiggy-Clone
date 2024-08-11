import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchCart } from '../Redux/cartActions';
import { getLogin } from '../Redux/userAction';
import CartHover from './Cart/CartHover';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector(state=>state.cartReducer)
  const [visibleCart, setVisibleCart] = useState(false);

  useEffect(()=>{
    dispatch(fetchCart())
  }, [dispatch])
  
  return (
    <>
    <div className='Navbar'>
        <div className='Navbar-Left'>
          <img src='https://cdn.iconscout.com/icon/free/png-256/free-swiggy-1613371-1369418.png' onClick={()=>{navigate('/')}}/>
        </div>
        <div className="Navbar-Right">
          <span className="nav-elem" onClick={()=>{navigate('/search')}}>Search</span>
          <span className="nav-elem" onClick={()=>dispatch(getLogin())}>Sign-in</span>
          <div className="nav-elem" onClick={()=>{navigate('/cart')}} onMouseOver={()=>{setVisibleCart(true)}} onMouseOut={()=>{setVisibleCart(false)}} >
            <div className='nav-cart-quant' style={{display: cart ? cart.items  ? cart.items.length > 0 ? "" : "none" : "none" : "none"}}>
             <span >{cart ? cart.items ? cart.items.length : null : null }</span> 
            </div> 
            <span>Cart</span>
          </div>
        </div>
    </div>
    <CartHover visibleCart={visibleCart} />
    </>
  )
}

export default Navbar