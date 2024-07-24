import React from 'react'
import { useSelector } from 'react-redux'

const Restaurants = () => {
  const restaurants = useSelector(state=>state.restaurants)
  return (
    <div className='restaurants'>
      <div className="restaurant-heading">
        <span>Restaurants with online food delivery in Delhi</span>
      </div>
      <div className="restaurant-container">
        { restaurants.map(item=>{
          return(
            <div className="restaurant-info">
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

export default Restaurants