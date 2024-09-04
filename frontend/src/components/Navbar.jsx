import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchCart } from '../Redux/cartActions';
import { getLogin, getAddress } from '../Redux/userAction';
import CartHover from './Cart/CartHover';
import UserHover from './User/UserHover/UserHover';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector(state=>state.cartReducer)
  const {user, currentAddress} = useSelector(state=>state.userReducer);
  const [visibleCart, setVisibleCart] = useState(false);
  const [visibleUser, setVisibleUser] = useState(false);


  useEffect(()=>{
    dispatch(fetchCart())
  }, [dispatch])
  
  return (
    <>
    <div className='Navbar'>
      <div className='Navbar-Left'>
        <img src='https://cdn.iconscout.com/icon/free/png-256/free-swiggy-1613371-1369418.png' onClick={()=>{navigate('/')}}/>
        {user?<span className="nav-elem nav-address" onClick={()=>dispatch(getAddress())}>{currentAddress ? 
        <>
        <span>{currentAddress.addressName}</span>
        <span>{currentAddress.address.substring(0, 35) + '...'}</span>
        <span>V</span>
        </>
        : "Address"}</span>:null}
      </div>
      <div className="Navbar-Right">
        <span className="nav-elem" onClick={()=>{navigate('/search')}}>Search</span>
        <span className="nav-elem" onClick={user ? ()=>navigate('/user') : ()=>dispatch(getLogin())}
         onMouseOver={()=>{setVisibleUser(true)}}
         onMouseOut={()=>{setVisibleUser(false)}}
        >{user ? `${user.name}` : "Sign in"}</span>
        <div className="nav-elem" onClick={()=>{navigate('/cart')}} onMouseOver={()=>{setVisibleCart(true)}} onMouseOut={()=>{setVisibleCart(false)}} >
          <div className='nav-cart-quant' style={{display: cart && cart.items  && cart.items.length > 0 ? "" : "none" }}>
            <span >{cart && cart.items ? cart.items.length : null}</span> 
          </div> 
          <span>Cart</span>
        </div>
      </div>
    </div>
    <CartHover visibleCart={visibleCart} />
    {user? <UserHover visibleUser={visibleUser} />: null}
    </>
  )
}

export default Navbar