import React from 'react'

const MenuCard = ({restaurant}) => {
  const menu = restaurant.menu;

  return (
    <div className="menucard">
      {Object.keys(menu).map(category => (
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

export default MenuCard