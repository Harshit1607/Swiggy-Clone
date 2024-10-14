import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchCart } from '../../../Redux/cartActions';
import { getLogin, getAddress } from '../../../Redux/userAction';
import CartHover from '../CartHover/CartHover';
import UserHover from '../../User/UserHover/UserHover';
import styles from './CartNav.module.css'; // Import the CSS module

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cartReducer);
  const { user, currentAddress } = useSelector(state => state.userReducer);
  const [visibleCart, setVisibleCart] = useState(false);
  const [visibleUser, setVisibleUser] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.NavbarLeft}>
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-swiggy-1613371-1369418.png"
            onClick={() => {
              navigate('/');
            }}
          />
          <span className={`${styles.navElem} ${styles.navAddress}`}>Secure Checkout</span>
        </div>
        <div className={styles.NavbarRight}>
          <span
            className={styles.navElem}
            onClick={user ? () => navigate('/user') : () => dispatch(getLogin())}
            onMouseOver={() => {
              setVisibleUser(true);
            }}
            onMouseOut={() => {
              setVisibleUser(false);
            }}
          >
            {user ? `${user.name}` : 'Sign in'}
          </span>
        </div>
      </div>
      <CartHover visibleCart={visibleCart} />
      {user ? <UserHover visibleUser={visibleUser} /> : null}
    </>
  );
};

export default Navbar;
