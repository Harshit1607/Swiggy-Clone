import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Cartdiv.module.css'; // Importing CSS module

const Cartdiv = () => {
  const { cart } = useSelector(state => state.cartReducer);
  const { singleRestaurant } = useSelector(state => state.restaurantReducer);
  const navigate = useNavigate();

  const thisCart = cart.restaurantId === singleRestaurant._id ? cart : null;

  useEffect(() => {
    const menu = document.querySelector(`.${styles.menuCircle}`);
    const menubox = document.querySelector(`.${styles.hiddenMenuBox}`);

    if (thisCart && thisCart.items.length > 0) {
      if (menu) menu.style.bottom = '12%';
      if (menubox) menubox.style.bottom = '12%';
    } else {
      if (menu) menu.style.bottom = '5%';
      if (menubox) menubox.style.bottom = '5%';
    }
  }, [cart, thisCart]);

  return (
    thisCart && thisCart.items && thisCart.items.length > 0 ? (
      <div className={styles.cartBox} onClick={() => { navigate('/cart') }}>
        <span>{thisCart.items.length} Items added</span>
        <span>View Cart</span>
      </div>
    ) : null
  );
}

export default Cartdiv;
