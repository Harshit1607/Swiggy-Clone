import React from 'react';
import Info from './Info';
import MenuCard from './MenuCard';
import { useSelector } from 'react-redux';

const RestaurantHome = () => {
  const { singleRestaurant, loading, error } = useSelector(state => state.restaurantReducer);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='loading'>Error: {error}</div>;
  }

  if (!singleRestaurant) {
    return <div>No restaurant information available</div>;
  }

  return (
    <div className="main">
      <Info />
      <MenuCard />
    </div>
  );
}

export default RestaurantHome;
