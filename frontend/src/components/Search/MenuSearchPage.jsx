import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDishBySearch,fetchRestaurants } from '../../Redux/restaurantActions';
import { deleteFromCart, addToCart } from '../../Redux/cartActions';
import Navbar from '../Navbar'

const MenuSearchPage = () => {
  const {singleRestaurant, searchDishes, loading, error} = useSelector(state=>state.restaurantReducer);
  const {cart} = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();


  function handleChange(e){
    const id = singleRestaurant._id 
    const text = e.target.value;
    if(text === ''){
      dispatch(fetchRestaurants());
      return;
    }
    dispatch(getDishBySearch(id, text))
  }

  function addItem(Item){
    const restId = singleRestaurant._id;
    dispatch(addToCart({Item, restId}))
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <>
    <Navbar />
    singleRestaurant ? <div className="main">
      <div className="search-box menu-search-page">
        <input onChange={(e)=>handleChange(e)}/>
      </div>
      <div className='menu-search-dishes menu-single'>
        {
          searchDishes ? searchDishes.length > 0 ?
          searchDishes.map(Item=>Item.map(menuItem=>{
            return(
              <div className="menu-single-item no-border-bottom" key={menuItem.itemId}>
                  <div className="item-name-price no-border-bottom">
                    <span>{menuItem.item}</span>
                    <span>{menuItem.price}</span>
                  </div>
                  <div className="menucard-quantity-button">
                    {cart.restaurantId === singleRestaurant._id ? (
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
            )
          }))
          : null : null
        }
      </div>
    </div> : null
    </>
  ) 
}

export default MenuSearchPage