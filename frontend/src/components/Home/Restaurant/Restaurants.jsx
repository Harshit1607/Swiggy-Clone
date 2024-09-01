import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';
import styles from './Restaurants.module.css'; // Importing the module CSS

const Restaurants = () => {
  const { restaurants, loading } = useSelector(state => state.restaurantReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(id) {
    dispatch(getSingleRestaurant({ id }));
    navigate('/restaurant');
  }

  if (!restaurants || restaurants.length === 0) {
    return <div>No restaurants available</div>;
  }

  return (
    <div className={styles.restaurants}>
      <div className={styles.restaurantHeading}>
        <span>Restaurants with online food delivery in Delhi</span>
      </div>
      <div className={styles.restaurantContainer}>
        {restaurants.map(item => (
          <div className={styles.restaurantInfo} onClick={() => handleClick(item._id)} key={item._id}>
            <img src={item.image} alt={item.name} />
            <span className={styles.restaurantName}>{item.name}</span>
            <span className={styles.restaurantRating}>{item.rating}</span>
            <span className={styles.restaurantCuisine}>{item.cuisine.substring(0, 25) + '...'}</span>
          </div>
        ))}
      </div>
      <div className="center">{loading && <div className='loader' />}</div>
    </div>
  );
};

export default Restaurants;
