import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../../Utils/Carousel/Carousel';
import styles from './FavRestaurants.module.css'; // Importing the module CSS
import Heart from '../../../Utils/Heart/Heart';
import { addToFav } from '../../../Redux/userAction';

const TopRestaurants = () => {
  const { favRest } = useSelector(state => state.restaurantReducer);
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(id) {
    dispatch(getSingleRestaurant({ id }));
    navigate('/restaurant');
  }

  if (!favRest || favRest.length === 0) {
    return <div>No Rest available</div>;
  }

  return (
    <div className={styles.recomendation}>
      <div className={styles.recomHeading}>
        <span>Your Favourites</span>
      </div>
      <Carousel length={3}>
        {favRest.map((item, index) => {
           const isFav = user && favRest && favRest.find(rest => rest._id === item._id); // Check if the restaurant is in favorites
           const red = isFav ? true : false; // Set red to true if found, otherwise false
          return(
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
        )})}
      </Carousel>
    </div>
  );
};

export default TopRestaurants;
