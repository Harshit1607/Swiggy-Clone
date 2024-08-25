import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../Utils/Carousel';


const TopRestaurants = () => {
  const { topRestaurants, loading, error } = useSelector(state => state.restaurantReducer);
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

  if (!topRestaurants || topRestaurants.length === 0) {
    return <div>No cuisines available</div>;
  }

  return (
    <div className="recomendation">
      <div className="recom-heading">
        <span>Top Restaurants in India</span>
      </div>
      <Carousel length={3}>
        { topRestaurants.map((item,index)=>{
          return(
            <div  className = "restaurant-info" onClick={()=>handleClick(item._id)} key={item._id}>
              <img  src={item.image} />
              <span className='restaurant-name'>{item.name}</span>
              <span className='restaurant-rating'>{item.rating}</span>
              <span className='restaurant-cusine'>{item.cuisine.substring(0, 25) + '...'}</span>
            </div>
          )
        })
        }
      </Carousel>
    </div>
  )
}

export default TopRestaurants