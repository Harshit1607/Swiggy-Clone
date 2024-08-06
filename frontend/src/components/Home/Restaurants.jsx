import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';

const Restaurants = () => {
  const { restaurants, loading, error } = useSelector(state => state.restaurantReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(id) {
    dispatch(getSingleRestaurant({ id }));
    navigate('/restaurant');
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  if (!restaurants || restaurants.length === 0) {
    return <div>No restaurants available</div>;
  }


  return (
    <div className='restaurants'>
      <div className="restaurant-heading">
        <span>Restaurants with online food delivery in Delhi</span>
      </div>
      <div className="restaurant-container">
        { restaurants.map(item=>{
          return(
            <div className="restaurant-info" onClick={()=>handleClick(item._id)} key={item._id}>
              <img src={item.image} />
              <span className='restaurant-name'>{item.name}</span>
              <span className='restaurant-rating'>{item.rating}</span>
              <span className='restaurant-cusine'>{item.cuisine.substring(0, 25) + '...'}</span>
            </div>
          )
        }) 
        }
        {loading && <div className='loader' />}
      </div>
      
    </div>
  )
}

export default Restaurants