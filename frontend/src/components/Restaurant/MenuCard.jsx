import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../Redux/cartActions';

const MenuCard = () => {
  const { singleRestaurant, loading, error } = useSelector(state => state.restaurantReducer);
  const {cart} = useSelector(state => state.cartReducer);
  const restaurants = singleRestaurant
  const dispatch = useDispatch()
  const [visible, setVisible] = useState([])


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

  function addItem(Item){
    const restId = singleRestaurant._id;
    dispatch(addToCart({Item, restId}))
  }
  
  function handleVisible(category){
    console.log(category)
    if(visible.includes(category)){
      setVisible(prev=>{
        return(
          prev.filter(item=>item !== category)
        )
      })
    } else{
      setVisible([...visible, category])
    }
    
    
  }
  console.log(visible)

  return (
    <div className="menucard">
      {Object.keys(menu)
        .filter(category => category !== '_id' && category !== 'items')
        .map(category => (
          <div key={category}>
            <div className="divider"></div>
            <div className="menu-single" id={category}>
              <div><span>{category}</span><span onClick={()=>{handleVisible(category)}} >v</span></div>
              {menu[category].map(menuItem => (
                <div className="menu-single-item" key={menuItem.itemId} style={{display: visible.includes(category)? "" : "none"}}>
                  <div className="item-name-price">
                    <span>{menuItem.item}</span>
                    <span>{menuItem.price}</span>
                  </div>
                  <div className="menucard-quantity-button">
                    {cart.restaurantId === restaurants._id ? (
                      cart.items.some(item => item.itemId === menuItem.itemId) ? (
                        <>
                          <button onClick={() => {
                            const Item = menuItem;
                            const restId = cart.restaurantId;
                            dispatch(deleteFromCart({ Item, restId }));
                          }}>-</button>
                          <span>
                            {cart.items.find(item => item.itemId === menuItem.itemId)?.quantity}
                          </span>
                          <button onClick={() => {
                            const Item = menuItem;
                            const restId = cart.restaurantId;
                            dispatch(addToCart({ Item, restId }));
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

