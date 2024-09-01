import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../../Utils/Carousel';
import styles from './TopRestaurants.module.css'; // Importing the module CSS

const TopRestaurants = () => {
  const { topRestaurants } = useSelector(state => state.restaurantReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(id) {
    dispatch(getSingleRestaurant({ id }));
    navigate('/restaurant');
  }

  if (!topRestaurants || topRestaurants.length === 0) {
    return <div>No cuisines available</div>;
  }

  return (
    <div className={styles.recomendation}>
      <div className={styles.recomHeading}>
        <span>Top Restaurants in India</span>
      </div>
      <Carousel length={3}>
        {topRestaurants.map((item, index) => (
          <div className={styles.restaurantInfo} onClick={() => handleClick(item._id)} key={item._id}>
            <img src={item.image} alt={item.name} />
            <span className={styles.restaurantName}>{item.name}</span>
            <span className={styles.restaurantRating}>{item.rating}</span>
            <span className={styles.restaurantCuisine}>{item.cuisine.substring(0, 25) + '...'}</span>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopRestaurants;
