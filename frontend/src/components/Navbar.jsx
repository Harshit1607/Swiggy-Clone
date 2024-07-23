import React from 'react'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className='Navbar-Left'>
          <span>logo</span>
        </div>
        <div className="Navbar-Right">
          <span className="nav-elem">Search</span>
          <span className="nav-elem">Sign-in/up</span>
          <span className="nav-elem">Cart</span>
        </div>
    </div>
  )
}

export default Navbar