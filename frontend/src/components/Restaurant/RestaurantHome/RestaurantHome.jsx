import React, { useState } from 'react';
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

  const [menuBox, setMenuBox] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!singleRestaurant) {
    return <div>No restaurant information available</div>;
  }

  const handleMenuBox = () => {
    setMenuBox(false);
  }
  return (
    <>
      <Navbar />
      <div className={styles.main}>
      <Info />
      <SearchBar />
      <MenuCard />
      <div className={styles.menuCircle} style={{display: !menuBox ?  "" : "none"}} onClick={()=>setMenuBox(true)}>
        Menu
      </div>
      <HiddenMenu menuBox={menuBox} handleMenuBox={handleMenuBox}/>
      <Cartdiv />
      </div>
    </>
    
  );
};

export default RestaurantHome;
