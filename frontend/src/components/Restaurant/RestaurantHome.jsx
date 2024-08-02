import React from 'react';
import Info from './Info';
import MenuCard from './MenuCard';
import { useSelector } from 'react-redux';
import HiddenMenu from './HiddenMenu';
import Cartdiv from './Cartdiv';
import SearchBar from './SearchBar';
import Navbar from '../Navbar';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';

const RestaurantHome = () => {
  const { singleRestaurant, loading, error } = useSelector(state => state.restaurantReducer);
  const {hiddenLogin, hiddenSignup} = useSelector(state => state.userReducer)

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
    <Login />
    <Signup />
    <Navbar />
    <div className="main main-relative" style={!hiddenLogin || !hiddenSignup ? {overflow: "hidden", height: "calc(100vh - 150px)"} : null}>
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
