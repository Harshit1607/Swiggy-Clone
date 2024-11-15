import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';
import styles from './Restaurants.module.css'; // Importing the module CSS
import Heart from '../../../Utils/Heart/Heart';
import { addToFav } from '../../../Redux/userAction';

const Restaurants = () => {
  const { restaurants, loading, favRest } = useSelector(state => state.restaurantReducer);
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(id) {
    dispatch(getSingleRestaurant({ id }));
    navigate('/restaurant');
  }

  if (!restaurants || restaurants.length === 0) {
    return <div>No restaurants available</div>;
  }
  let red;
  return (
    <div className={styles.restaurants}>
      <div className={styles.restaurantHeading}>
        <span>Restaurants with online food delivery in Delhi</span>
      </div>
      <div className={styles.restaurantContainer}>
      {restaurants.map(item => {
          const isFav = user && favRest && favRest.find(rest => rest._id === item._id); // Check if the restaurant is in favorites
          const red = isFav ? true : false; // Set red to true if found, otherwise false
          
          return (
            <div className={styles.restaurantInfo} onClick={() => handleClick(item._id)} key={item._id}>
              <Heart red={red} onClick={(e)=>{
                e.stopPropagation(); // Prevent the click from propagating to the parent div
                if (user) {
                  console.log("hi")
                  // Dispatch addToFav action if the user is logged in
                  dispatch(addToFav(user._id, item._id));
                }
              }}/>
              <img src={item.image} alt={item.name} />
              <span className={styles.restaurantName}>{item.name}</span>
              <span className={styles.restaurantRating}>{item.rating}</span>
              <span className={styles.restaurantCuisine}>{item.cuisine.substring(0, 25) + '...'}</span>
            </div>
          );
        })}
      </div>
      <div className="center">{loading && <div className='loader' />}</div>
    </div>
  );
};

export default Restaurants;
