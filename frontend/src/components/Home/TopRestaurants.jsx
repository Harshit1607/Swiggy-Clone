import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';


const TopRestaurants = () => {
  const { topRestaurants, loading, error } = useSelector(state => state.restaurantReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const carouselRef = useRef(null);
  const slidesToShow = 3

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
        <div>
          <button onClick={prevSlide} >&lt;</button>
          <button onClick={nextSlide} >&gt;</button>
        </div>
      </div>
      <div className="recom-container" ref={carouselRef}>
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
      </div>
    </div>
  )
}

export default TopRestaurants