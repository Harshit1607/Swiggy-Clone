import React from 'react'
import restaurants from '../../assets/restaurants.json'
import Info from './Info';
import MenuCard from './MenuCard';

const RestaurantHome = () => {
  const restaurant = restaurants[5]
  return (
    <div className='main'>
      <Info restaurant={restaurant}/>
      <MenuCard restaurant={restaurant}/>
    </div>
  )
}

export default RestaurantHome