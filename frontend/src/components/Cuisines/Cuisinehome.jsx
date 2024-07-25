import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleRestaurant } from '../../Redux/actions';
import { useNavigate } from 'react-router-dom';


const Cuisinehome = () => {
  const restaurants = useSelector(state=>state.restaurants)
  const restaurant = useSelector(state=>state.singleRestaurant)
  const dispatch = useDispatch();
  const navigate = useNavigate()


  function handleClick(id){
    dispatch(getSingleRestaurant({id}))
  }

  useEffect(() => {
    if (restaurant) {
      navigate('/restaurant');
    }
  }, [restaurant, navigate]);

  return (
    <div className='restaurants'>
      <div className="restaurant-heading">
        <span>Restaurants with online food delivery in Delhi</span>
      </div>
      <div className="restaurant-container">
        { restaurants.map(item=>{
          return(
            <div className="restaurant-info" onClick={()=>handleClick(item._id)}>
              <img src={item.image} />
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

export default Cuisinehome