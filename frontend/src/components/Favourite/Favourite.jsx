import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavRestaurants, getSingleRestaurant } from '../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import styles from './Favourite.module.css';
import Heart from '../../Utils/Heart/Heart';
import { addToFav } from '../../Redux/userAction';

const Favourite = () => {
  const { favRest, loading, error } = useSelector(state => state.restaurantReducer);
  const { hiddenLogin, hiddenSignup, user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(id) {
    dispatch(getSingleRestaurant({ id }));
    navigate('/restaurant');
  }
  useEffect(()=>{
    if(user){
      dispatch(getFavRestaurants(user._id))
    }
  }, [user])
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="loading">Error: {error}</div>;
  }

  if (!favRest || favRest.length === 0) {
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
          <span>Your Favourites</span>
        </div>
        <div className={styles.restaurantContainer}>
          {favRest.map(item => {
            const isFav = user && favRest && favRest.find(rest => rest._id === item._id); // Check if the restaurant is in favorites
            const red = isFav ? true : false; // Set red to true if found, otherwise false
            return(
            <div className={styles.restaurantInfo} onClick={() => handleClick(item._id)} key={item._id}>
              <Heart  red={red} onClick={(e)=>{
                e.stopPropagation(); // Prevent the click from propagating to the parent div
                if (user) {
                  console.log("hi")
                  // Dispatch addToFav action if the user is logged in
                  dispatch(addToFav(user._id, item._id));
                }
              }}/>
              <img src={item.image} alt={`${item.name}`} />
              <span className={styles.restaurantName}>{item.name}</span>
              <span className={styles.restaurantRating}>{item.rating}</span>
              <span className={styles.restaurantCusine}>{item.cuisine.substring(0, 25) + '...'}</span>
            </div>
          )})}
        </div>
      </div>
    </>
  );
}

export default Favourite;
