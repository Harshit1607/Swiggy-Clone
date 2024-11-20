import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { cartExpiration, fetchCart } from '../../../Redux/cartActions';
import { getLogin, getAddress } from '../../../Redux/userAction';
import CartHover from '../CartHover/CartHover';
import UserHover from '../../User/UserHover/UserHover';
import styles from './CartNav.module.css'; // Import the CSS module
import cartsvg from '../../../assets/cart.svg';
import profilesvg from '../../../assets/profile.svg';
import searchsvg from '../../../assets/search.svg';
import swiggysvg from '../../../assets/swiggy-1.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cartReducer);
  const { user, currentAddress } = useSelector(state => state.userReducer);
  const [visibleCart, setVisibleCart] = useState(false);
  const [visibleUser, setVisibleUser] = useState(false);

  // const userId = user ? user._id : "";
  // const cartId = cart ? cart._id : "";

  // useEffect(() => {
  //   if (userId || cartId) { // Ensure both are defined
  //     dispatch(cartExpiration());
  //     dispatch(fetchCart({ cartId, userId }));
  //   }
  // }, [dispatch, userId, cartId]);

  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.NavbarLeft}>
          <img
            src={swiggysvg}
            onClick={() => {
              navigate('/');
            }}
          />
          <span className={`${styles.navElem} ${styles.navAddress}`}>Secure Checkout</span>
        </div>
        <div className={styles.NavbarRight}>
        <div
            className={styles.navElem}
            onClick={user ? () => navigate('/user') : () => dispatch(getLogin())}
            onMouseOver={() => {
              setVisibleUser(true);
            }}
            onMouseOut={() => {
              setVisibleUser(false);
            }}
          >
            <img src={profilesvg} alt='' />
            <span>{user ? `${user.name}` : 'Sign in'}</span>
          </div>
        </div>
      </div>
      <CartHover visibleCart={visibleCart} />
      {user ? <UserHover visibleUser={visibleUser} /> : null}
    </>
  );
};

export default Navbar;
