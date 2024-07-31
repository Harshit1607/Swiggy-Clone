import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchCart } from '../Redux/cartActions';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector(state=>state.cartReducer)

  useEffect(()=>{
    dispatch(fetchCart())
  }, [dispatch])
  
  return (
    <div className='Navbar'>
        <div className='Navbar-Left'>
          <img src='https://cdn.iconscout.com/icon/free/png-256/free-swiggy-1613371-1369418.png' onClick={()=>{navigate('/')}}/>
        </div>
        <div className="Navbar-Right">
          <span className="nav-elem" onClick={()=>{navigate('/search')}}>Search</span>
          <span className="nav-elem">Sign-in/up</span>
          <div className="nav-elem" onClick={()=>{navigate('/cart')}}>
            <div className='nav-cart-quant'>
             <span>{cart ? cart.items  ? cart.items.length > 0 ? cart.items.length : null : null : null}</span> 
            </div> 
            <span>Cart</span>
          </div>
          
        </div>
    </div>
  )
}

export default Navbar