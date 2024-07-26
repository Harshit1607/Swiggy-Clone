import React from 'react'

const Cart = () => {
  return (
    <div className="cart-main">
      <div className='empty-cart'>
        <span>Your cart is empty</span>
        <button>See restaurants near you</button>
      </div>
    </div>
  )
}

export default Cart