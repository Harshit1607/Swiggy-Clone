import React from 'react';
import { useSelector } from 'react-redux';

const MenuCard = () => {
  const { singleRestaurant, loading, error } = useSelector(state => state);
  const restaurants = singleRestaurant
 

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

  

  return (
    <div className="menucard">
      {Object.keys(menu).filter(category => category !== '_id' && category !== 'items').map(category => (
        <div key={category}>
          <div className="divider"></div>
          <div className="menu-single">
            <span>{category}</span>
            {menu[category].map(menuItem => (
              <div className="menu-single-item" key={menuItem.itemId}>
                <div className="item-name-price">
                  <span>{menuItem.item}</span>
                  <span>{menuItem.price}</span>
                </div>
                <button>Add</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuCard;

