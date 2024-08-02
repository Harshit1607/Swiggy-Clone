import React, { useEffect } from 'react';
import Recomendation from './Recomendation';
import Restaurants from './Restaurants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../Redux/restaurantActions';
import TopRestaurants from './TopRestaurants';
import Navbar from '../Navbar';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.restaurantReducer);
  const {hiddenLogin, hiddenSignup} = useSelector(state => state.userReducer)

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
    <>
    <Login />
    <Signup />
    <Navbar />
    <div className="main" style={!hiddenLogin || !hiddenSignup ? {overflow: "hidden", height: "calc(100vh - 80px)"} : null}>
      <Recomendation />
      <div className="home-divider"></div>
      <TopRestaurants />
      <div className="home-divider"></div>
      <Restaurants />
    </div>
    </>
  );
};

export default Home;
