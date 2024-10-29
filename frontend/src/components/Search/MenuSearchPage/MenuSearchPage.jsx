import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDishBySearch, fetchRestaurants, noText } from '../../../Redux/restaurantActions';
import { deleteFromCart, addToCart } from '../../../Redux/cartActions';
import Navbar from '../../Navbar'
import { Debouncing } from '../../../Utils/Debouncing';
import { useNavigate } from 'react-router-dom';
import styles from './MenuSearchPage.module.css'; // Import the CSS module

const MenuSearchPage = () => {
  const { singleRestaurant, searchDishes, loading, error } = useSelector(state => state.restaurantReducer);
  const { cart } = useSelector(state => state.cartReducer);
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user ? user._id : "";
  const cartId = cart ? cart._id : "";

  const debouncedSearch = useCallback(Debouncing((id, text) => {
    dispatch(getDishBySearch(id, text));
  }, 800), [dispatch]);

  function handleChange(e) {
    const id = singleRestaurant._id;
    const text = e.target.value;
    if (text === '') {
      dispatch(noText());
      return;
    }
    debouncedSearch(id, text);
  }

  function addItem(Item) {
    const restId = singleRestaurant._id;
    dispatch(addToCart({ Item, restId, cartId, userId }));
  }

  return (
    <>
      <Navbar />
      {singleRestaurant ? 
        <div className={styles.main}>
          <div className={`${styles.searchBox} ${styles.menuSearchPage}`}>
            <input onChange={(e) => handleChange(e)} placeholder={`Search in the ${singleRestaurant.name}`} />
            <span onClick={() => { navigate('/restaurant') }}>&lt;-</span>
          </div>
          <div className={`${styles.menuSearchDishes} ${styles.menuSingle}`}>
            {searchDishes && searchDishes.length > 0 && searchDishes.map(Item => Item.map(menuItem => (
              <div className={`${styles.menuSingleItem} ${styles.noBorderBottom}`} key={menuItem.itemId}>
                <div className={`${styles.itemNamePrice} ${styles.noBorderBottom}`}>
                  <span>{menuItem.item}</span>
                  <span>{menuItem.price}</span>
                </div>
                <div className={styles.menucardQuantityButton}>
                  {cart.restaurantId === singleRestaurant._id ? (
                    cart.items.some(item => item.itemId === menuItem.itemId) ? (
                      <>
                        <button onClick={() => {
                          const Item = menuItem;
                          const restId = cart.restaurantId;
                          dispatch(deleteFromCart({ Item, restId, cartId, userId }));
                        }}>-</button>
                        <span>
                          {cart.items.find(item => item.itemId === menuItem.itemId)?.quantity}
                        </span>
                        <button onClick={() => {
                          const Item = menuItem;
                          const restId = cart.restaurantId;
                          dispatch(addToCart({ Item, restId, cartId, userId }));
                        }}>+</button>
                      </>
                    ) : (
                      <button onClick={() => addItem(menuItem)}>add</button>
                    )
                  ) : (
                    <button onClick={() => addItem(menuItem)}>add</button>
                  )}
                </div>
              </div>
            )))}
          </div>
        </div>
        : null}
    </>
  )
}

export default MenuSearchPage;