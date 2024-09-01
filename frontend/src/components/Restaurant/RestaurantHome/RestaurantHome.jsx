import React from 'react';
import Info from '../Info/Info';
import MenuCard from '../MenuCard/MenuCard';
import { useSelector } from 'react-redux';
import HiddenMenu from '../HiddenMenu/HiddenMenu';
import Cartdiv from '../Cartdiv/Cartdiv';
import SearchBar from '../SearchBar/SearchBar';
import styles from './RestaurantHome.module.css'; // Importing CSS module
import Navbar from '../../Navbar';

const RestaurantHome = () => {
  const { singleRestaurant, loading, error } = useSelector(state => state.restaurantReducer);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!singleRestaurant) {
    return <div>No restaurant information available</div>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.main}>
      <HiddenMenu />
      <Info />
      <SearchBar />
      <MenuCard />
      <Cartdiv />
      <div className={styles.menuCircle} >
        Menu
      </div>
      </div>
    </>
    
  );
};

export default RestaurantHome;
