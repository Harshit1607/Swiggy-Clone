import React, { useEffect } from 'react';
import Recomendation from './Recomendation';
import Restaurants from './Restaurants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../Redux/restaurantActions';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.restaurantReducer);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='loading'>Error: {error}</div>;
  }

  return (
    <div className="main">
      <Recomendation />
      <Restaurants />
    </div>
  );
};

export default Home;
