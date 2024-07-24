import React from 'react'
import restaurants from '../../assets/restaurants.json'

const Restaurants = () => {
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