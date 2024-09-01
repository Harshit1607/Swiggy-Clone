import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Info.module.css'; // Importing CSS module

const Info = () => {
  const { singleRestaurant, loading, error } = useSelector(state => state.restaurantReducer);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!singleRestaurant) {
    return <div>No restaurant information available</div>;
  }

  return (
    <div className={styles.menuPageInfo}>
      <div className={styles.menuResName}><span onClick={() => { navigate('/') }} style={{ cursor: 'pointer' }}>Home</span> / {singleRestaurant.name}</div>
      <div className={styles.menuBox} style={{ backgroundImage: `url(${singleRestaurant.image})` }}>
        <span>{singleRestaurant.name}</span>
        <div className={styles.menuSmallBox}>
          <div>
            <div>
              <span>{singleRestaurant.rating} ({singleRestaurant.num_of_rating} ratings)</span>
              <span>{singleRestaurant.price_for_two}</span>
            </div>
            <span>{singleRestaurant.cuisine}</span>
            <span>3.0 Kms</span>
          </div>
          <img src={singleRestaurant.image} alt={singleRestaurant.name} />
        </div>
      </div>
    </div>
  );
};

export default Info;
