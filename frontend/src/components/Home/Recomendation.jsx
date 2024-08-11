import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByCuisine } from '../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';

const Recomendation = () => {
  const { cuisines, loading, error } = useSelector(state => state.restaurantReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const carouselRef = useRef(null);
  const slidesToShow = 5

  const nextSlide = () => {
    if (carouselRef.current) {
        const scrollAmount = carouselRef.current.clientWidth / slidesToShow;
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
      if (carouselRef.current) {
          const scrollAmount = carouselRef.current.clientWidth / slidesToShow;
          carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
  };

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
        <div>
          <button onClick={prevSlide} >&lt;</button>
          <button onClick={nextSlide} >&gt;</button>
        </div>
      </div>
      <div className="recom-container" ref={carouselRef}>
        {cuisines.map((item, index)=>{
          return(
            <div className = "recom-img" key={index}>
              <img src={item.image} onClick={()=>handleClick(item.cuisine)}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Recomendation;
