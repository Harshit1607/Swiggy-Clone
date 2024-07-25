import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByCuisine } from '../../Redux/actions';
import { useNavigate } from 'react-router-dom';

const Recomendation = () => {
  const { cuisines, loading, error } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [slide, setSlide] = useState([0, 1, 2, 3]);

  function nextSlide() {
    setSlide(slide.map(item => item + 1));
  }

  function prevSlide() {
    setSlide(slide.map(item => item - 1));
  }

  function handleClick(cuisine) {
    dispatch(getRestaurantByCuisine(cuisine));
    navigate('/cuisine');
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cuisines || cuisines.length === 0) {
    return <div>No cuisines available</div>;
  }

  return (
    <div className="recomendation">
      <div className="recom-heading">
        <span>Whats on Your mind</span>
        <div>
          <button onClick={prevSlide} style={slide[0]===0 ? {display: 'none'}: null}>&lt;</button>
          <button onClick={nextSlide} style={slide[3]===cuisines.length-1 ? {display: 'none'}: null}>&gt;</button>
        </div>
      </div>
      <div className="recom-container">
        {cuisines.map((item, index)=>{
          return(
            <div className = {slide.includes(index)? "recom-img" : "recom-img recon-img-hidden"}>
              <img src={item.image} onClick={()=>handleClick(item.cuisine)}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Recomendation;
