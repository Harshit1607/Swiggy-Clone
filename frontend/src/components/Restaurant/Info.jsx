import React from 'react'
import { useSelector } from 'react-redux'

const Info = () => {
  const restaurant = useSelector(state=>state.singleRestaurant.restaurant)
  return (
    <div className='Menu-page-info'>
      <div className='Menu-res-name'>Home  /  {restaurant.name}</div>
      <div className='menu-box'>
        <span>{restaurant.name}</span>
        <div className="menu-smallbox">
          <div><span>{restaurant.rating}{restaurant.num_of_rating}</span><span>{restaurant.price_for_two}</span></div>
          <span>{restaurant.cuisine}</span>
          <span>3.0Kms</span>
        </div>
      </div>
    </div>
  )
}

export default Info