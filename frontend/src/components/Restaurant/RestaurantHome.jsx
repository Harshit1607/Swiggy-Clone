import React from 'react';
import Info from './Info';
import MenuCard from './MenuCard';
import { useSelector } from 'react-redux';
import HiddenMenu from './HiddenMenu';
import Cartdiv from './Cartdiv';
import SearchBar from './SearchBar';

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
    <>
    <div className="main main-relative">
      <Info />
      <SearchBar />
      <MenuCard />
    </div>
    <HiddenMenu />
    <Cartdiv />
    </>
  );
}

export default RestaurantHome;
