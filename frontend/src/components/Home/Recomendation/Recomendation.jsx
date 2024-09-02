import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByCuisine } from '../../../Redux/restaurantActions';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../../Utils/Carousel/Carousel';
import styles from './Recomendation.module.css'; // Importing the module CSS

const Recomendation = () => {
  const { cuisines } = useSelector(state => state.restaurantReducer);
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(cuisine) {
    dispatch(getRestaurantByCuisine(cuisine));
    navigate('/cuisine');
  }

  if (!cuisines || cuisines.length === 0) {
    return <div>No cuisines available</div>;
  }

  return (
    <div className={styles.recomendation}>
      <div className={styles.recomHeading}>
        <span>{user ? user.name : null}, What's on Your Mind?</span>
      </div>
      <Carousel length={5}>
        {cuisines.map((item, index) => (
          <div className={styles.recomImg} key={index}>
            <img src={item.image} onClick={() => handleClick(item.cuisine)} alt={item.cuisine} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Recomendation;
