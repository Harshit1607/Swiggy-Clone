import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByCuisine } from '../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../Utils/Carousel';

const Recomendation = () => {
  const { cuisines, loading, error } = useSelector(state => state.restaurantReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  function handleClick(cuisine) {
    dispatch(getRestaurantByCuisine(cuisine));
    navigate('/cuisine');
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  if (!cuisines || cuisines.length === 0) {
    return <div>No cuisines available</div>;
  }

  return (
    <div className="recomendation">
      <div className="recom-heading">
        <span>Whats on Your mind?</span>
      </div>
      <Carousel length={5}>
        {cuisines.map((item, index)=>{
            return(
              <div className = "recom-img" key={index}>
                <img src={item.image} onClick={()=>handleClick(item.cuisine)}/>
              </div>
            )
          })}
      </Carousel>
    </div>
  )
}

export default Recomendation;
