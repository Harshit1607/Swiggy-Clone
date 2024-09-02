import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './HiddenMenu.module.css'; // Importing CSS module

const HiddenMenu = ({menuBox, handleMenuBox}) => {
  const { singleRestaurant, loading, error } = useSelector(state => state.restaurantReducer);
  const restaurants = singleRestaurant;
  const menuRef = useRef(null); // Ref to track the hidden menu box


  // if (mainbox) {
  //   mainbox.onmousedown = () => {
  //     setMenu(true);
  //   };
  // }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Only trigger handleMenuBox if the click is outside the hidden menu box
        handleMenuBox();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleMenuBox]);
  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='loading'>Error: {error}</div>;
  }

  if (!singleRestaurant) {
    return <div>No restaurant information available</div>;
  }

  const menu = restaurants.menu[0];
  return (
    <>
      <div ref={menuRef} className={styles.hiddenMenuBox} style={{ display: menuBox ? "" : "none" }}>
        {Object.keys(menu)
          .filter(category => category !== '_id' && category !== 'items')
          .map(category => {
            return (
              <div className={`${styles.menuSingleItem} ${styles.hiddenMenuSingleItem}`} key={category}>
                <span><a href={`#${category}`} onClick={handleMenuBox}>{category}</a></span>
                <span><a href={`#${category}`} onClick={handleMenuBox}>{menu[category].length}</a></span>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default HiddenMenu;
