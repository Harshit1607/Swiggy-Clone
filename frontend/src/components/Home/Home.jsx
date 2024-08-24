import React, { useCallback, useEffect, useRef } from 'react';
import Recomendation from './Recomendation';
import Restaurants from './Restaurants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../Redux/restaurantActions';
import TopRestaurants from './TopRestaurants';
import Navbar from '../Navbar';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import { Throttle } from '../../Utils/Throttle';
import Footer from './Footer';
import Address from '../User/Address';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, page, hasMore, restaurants } = useSelector(state => state.restaurantReducer);
  const {hiddenLogin, hiddenSignup} = useSelector(state => state.userReducer)
  
  const initialFetchRef = useRef(true)
  
  useEffect(() => {
    if (initialFetchRef.current && hasMore && restaurants.length === 0) {
      initialFetchRef.current = false;
      dispatch(fetchRestaurants(1)); // Fetch the first page initially
    }
  }, []);

  const handleScroll = useCallback(Throttle(() => {
    if (hasMore && !loading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
      dispatch(fetchRestaurants(page+1));
    }
  }, 500), [dispatch, hasMore, page, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && page < 1) {
    return <div className='loading'>Loading...<div className='loader' /></div>;
  }

  if (error) {
    return <div className='loading'>Error: {error}</div>;
  }

  return (
    <>
    <Login />
    <Signup />
    <Address />
    <Navbar />
    <div className="main" style={!hiddenLogin || !hiddenSignup ? {overflow: "hidden", height: "calc(100vh - 80px)"} : null}>
      <Recomendation />
      <div className="home-divider"></div>
      <TopRestaurants />
      <div className="home-divider"></div>
      <Restaurants />
      <Footer />
    </div>
    </>
  );
};

export default Home;
