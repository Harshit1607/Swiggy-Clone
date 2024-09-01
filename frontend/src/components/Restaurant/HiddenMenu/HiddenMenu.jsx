import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './HiddenMenu.module.css'; // Importing CSS module

const HiddenMenu = () => {
  const { singleRestaurant, loading, error } = useSelector(state => state.restaurantReducer);
  const restaurants = singleRestaurant;
  const [menubox, setMenu] = useState(true);

  const mainbox = document.getElementsByClassName(styles.main)[0];

  if (mainbox) {
    mainbox.onmousedown = () => {
      setMenu(true);
    };
  }

  function handleClick() {
    setMenu(!menubox);
  }

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
      <div className={styles.menuCircle} style={{ display: menubox ? "" : "none" }} onClick={handleClick}>
        Menu
      </div>
      <div className={styles.hiddenMenuBox} style={{ display: !menubox ? "" : "none" }}>
        {Object.keys(menu)
          .filter(category => category !== '_id' && category !== 'items')
          .map(category => {
            return (
              <div className={`${styles.menuSingleItem} ${styles.hiddenMenuSingleItem}`} key={category}>
                <span><a href={`#${category}`} onClick={handleClick}>{category}</a></span>
                <span><a href={`#${category}`} onClick={handleClick}>{menu[category].length}</a></span>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default HiddenMenu;
