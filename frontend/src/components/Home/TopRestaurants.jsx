import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';


const TopRestaurants = () => {
  const { topRestaurants, loading, error } = useSelector(state => state.restaurantReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [slide, setSlide] = useState([0, 1, 2, 3]);

  function nextSlide() {
    setSlide(slide.map(item => item + 1));
  }

  function prevSlide() {
    setSlide(slide.map(item => item - 1));
  }

  function handleClick(id) {
    dispatch(getSingleRestaurant({ id }));
    navigate('/restaurant');
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!topRestaurants || topRestaurants.length === 0) {
    return <div>No cuisines available</div>;
  }

  return (
    <div className="recomendation">
      <div className="recom-heading">
        <span>Top Restaurants in India</span>
        <div>
          <button onClick={prevSlide} style={slide[0]===0 ? {display: 'none'}: null}>&lt;</button>
          <button onClick={nextSlide} style={slide[3]===topRestaurants.length-1 ? {display: 'none'}: null}>&gt;</button>
        </div>
      </div>
      <div className="recom-container">
        { topRestaurants.map((item,index)=>{
          return(
            <div  className = {slide.includes(index)? "restaurant-info" : "restaurant-info restaurant-info-hidden"} onClick={()=>handleClick(item._id)} key={item._id}>
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