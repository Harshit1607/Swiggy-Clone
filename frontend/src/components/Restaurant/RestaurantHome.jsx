import React from 'react'
import restaurants from '../../assets/restaurants.json'
import Info from './Info';
import MenuCard from './MenuCard';
import { useSelector } from 'react-redux';

const RestaurantHome = () => {
  const restaurant = useSelector(state=>state.singleRestaurant.restaurant)
  return (
    <div className='main'>
      <Info />
      <MenuCard />
    </div>
  )
}

export default RestaurantHome