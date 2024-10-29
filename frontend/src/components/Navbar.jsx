import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { cartExpiration, fetchCart } from '../Redux/cartActions';
import { getLogin, getAddress } from '../Redux/userAction';
import CartHover from './Cart/CartHover/CartHover';
import UserHover from './User/UserHover/UserHover';
import styles from './Navbar.module.css'; // Import the CSS module

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
            src="https://cdn.iconscout.com/icon/free/png-256/free-swiggy-1613371-1369418.png"
            onClick={() => {
              navigate('/');
            }}
          />
          {user ? (
            <span className={`${styles.navElem} ${styles.navAddress}`} onClick={() => dispatch(getAddress())}>
              {currentAddress ? (
                <>
                  <span>{currentAddress.addressName}</span>
                  <span>{currentAddress.address.substring(0, 35) + '...'}</span>
                  <span>V</span>
                </>
              ) : (
                'Address'
              )}
            </span>
          ) : null}
        </div>
        <div className={styles.NavbarRight}>
          <span className={styles.navElem} onClick={() => { navigate('/search'); }}>Search</span>
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
          <div
            className={styles.navElem}
            onClick={() => {
              navigate('/cart');
            }}
            onMouseOver={() => {
              setVisibleCart(true);
            }}
            onMouseOut={() => {
              setVisibleCart(false);
            }}
          >
            <div
              className={styles.navCartQuant}
              style={{ display: cart && cart.items && cart.items.length > 0 ? '' : 'none' }}
            >
              <span>{cart && cart.items ? cart.items.length : null}</span>
            </div>
            <span>Cart</span>
          </div>
        </div>
      </div>
      <CartHover visibleCart={visibleCart} />
      {user ? <UserHover visibleUser={visibleUser} /> : null}
    </>
  );
};

export default Navbar;
