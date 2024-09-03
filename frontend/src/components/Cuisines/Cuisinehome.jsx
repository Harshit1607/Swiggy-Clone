import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import styles from './Cuisinehome.module.css';

const Cuisinehome = () => {
  const { restaurants, loading, error } = useSelector(state => state.restaurantReducer);
  const { hiddenLogin, hiddenSignup } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(id) {
    dispatch(getSingleRestaurant({ id }));
    navigate('/restaurant');
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="loading">Error: {error}</div>;
  }

  if (!restaurants || restaurants.length === 0) {
    return <div>No restaurants available</div>;
  }

  return (
    <>
      <Login />
      <Signup />
      <Navbar />
      <div 
        className={styles.restaurants} 
        style={!hiddenLogin || !hiddenSignup ? { overflow: "hidden", height: "calc(100vh - 80px)" } : null}
      >
        <div className={styles.restaurantHeading}>
          <span>Restaurants with online food delivery in Delhi</span>
        </div>
        <div className={styles.restaurantContainer}>
          {restaurants.map(item => (
            <div className={styles.restaurantInfo} onClick={() => handleClick(item._id)} key={item._id}>
              <img src={item.image} alt={`${item.name}`} />
              <span className={styles.restaurantName}>{item.name}</span>
              <span className={styles.restaurantRating}>{item.rating}</span>
              <span className={styles.restaurantCusine}>{item.cuisine.substring(0, 25) + '...'}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cuisinehome;
