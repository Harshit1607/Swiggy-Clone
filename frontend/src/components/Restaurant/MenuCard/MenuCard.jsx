import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../../Redux/cartActions';
import styles from './MenuCard.module.css'; // Importing CSS module

const MenuCard = () => {
  const { singleRestaurant, loading, error } = useSelector(state => state.restaurantReducer);
  const { cart } = useSelector(state => state.cartReducer);
  const {user} = useSelector(state => state.userReducer);
  const restaurants = singleRestaurant;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState([]);

  const userId = user ? user._id : "";
  const cartId = cart ? cart._id : "";


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const menu = restaurants.menu[0];

  if (!restaurants || !restaurants.menu) {
    return <div>No menu available</div>;
  }

  function addItem(Item) {
    const restId = singleRestaurant._id;
    dispatch(addToCart({ Item, restId, cartId, userId }));
  }

  function handleVisible(category) {
    if (visible.includes(category)) {
      setVisible(prev => prev.filter(item => item !== category));
    } else {
      setVisible([...visible, category]);
    }
  }

  return (
    <div className={styles.menuCard}>
      {Object.keys(menu)
        .filter(category => category !== '_id' && category !== 'items')
        .map(category => (
          <div key={category}>
            <div className={styles.divider}></div>
            <div className={styles.menuSingle} id={category}>
              <div><span>{category}</span><span onClick={() => handleVisible(category)} className={styles.slider}>v</span></div>
              {menu[category].map(menuItem => (
                <div className={styles.menuSingleItem} key={menuItem.itemId} style={{ display: visible.includes(category) ? "" : "none" }}>
                  <div className={styles.itemNamePrice}>
                    <span>{menuItem.item}</span>
                    <span>{menuItem.price}</span>
                  </div>
                  <div className={styles.menuCardQuantityButton}>
                    {cart && cart.restaurantId === restaurants._id ? (
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
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default MenuCard;
