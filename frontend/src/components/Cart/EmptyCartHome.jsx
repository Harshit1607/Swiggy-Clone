import React from 'react'

const EmptyCartHome = ({visibleCart}) => {
  return (
    <div className="cart-hover-div" style={{display: visibleCart ? "" : "none"}} >
      <span>Cart Empty</span>
      <span>
        <span>Good Food is always cooking!</span>
        <span>Go ahead, Order some yummy items from menu</span>
      </span>
    </div>
    
  )
}

export default EmptyCartHome