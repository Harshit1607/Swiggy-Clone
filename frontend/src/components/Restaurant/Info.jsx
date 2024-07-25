import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Info = () => {
  const { singleRestaurant, loading, error } = useSelector(state => state);
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
    <div className="Menu-page-info">
      <div className="Menu-res-name"><span onClick={()=>{navigate('/')}} style={{cursor: 'pointer'}}>Home</span> / {singleRestaurant.name}</div>
      <div className="menu-box">
        <span>{singleRestaurant.name}</span>
        <div className="menu-smallbox">
          <div>
            <span>{singleRestaurant.rating} ({singleRestaurant.num_of_rating} ratings)</span>
            <span>{singleRestaurant.price_for_two}</span>
          </div>
          <span>{singleRestaurant.cuisine}</span>
          <span>3.0 Kms</span>
        </div>
      </div>
    </div>
  );
};

export default Info;
