import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <div className='Navbar'>
        <div className='Navbar-Left'>
          <img src='https://cdn.iconscout.com/icon/free/png-256/free-swiggy-1613371-1369418.png' onClick={()=>{navigate('/')}}/>
        </div>
        <div className="Navbar-Right">
          <span className="nav-elem" onClick={()=>{navigate('/search')}}>Search</span>
          <span className="nav-elem">Sign-in/up</span>
          <span className="nav-elem" onClick={()=>{navigate('/cart')}}>Cart</span>
        </div>
    </div>
  )
}

export default Navbar