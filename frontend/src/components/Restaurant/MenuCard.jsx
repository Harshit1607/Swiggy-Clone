import React from 'react';
import { useSelector } from 'react-redux';

const MenuCard = () => {
  const restaurant = useSelector(state => state.singleRestaurant.restaurant);
  console.log(restaurant)

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  const menu = restaurant.menu[0];
  
  if (!menu) {
    return <div>No menu available</div>;
  }

  return (
    <div className="menucard">
      {Object.keys(menu).filter(category=> category != '_id'&& category !== 'items').map(category => (
        <div key={category}>
          <div className="divider"></div>
          <div className="menu-single">
            <span>{category}</span>
            {menu[category].map(menuItem => (
              
              <div className="menu-single-item" key={menuItem.itemId}>
                {/* {console.log(menuItem)} */}
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
