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

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, page, hasMore } = useSelector(state => state.restaurantReducer);
  const {hiddenLogin, hiddenSignup} = useSelector(state => state.userReducer)
  
  const initialFetchRef = useRef(true)
  console.log(hasMore);
  console.log(page)
  
  useEffect(() => {
    if (initialFetchRef.current) {
      initialFetchRef.current = false;
      console.log("Initial fetch for page 1");
      dispatch(fetchRestaurants(1)); // Fetch the first page initially
    }
  }, [dispatch]);

  const handleScroll = useCallback(Throttle(() => {
    if (hasMore && !loading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      dispatch(fetchRestaurants(page+1));
    }
  }, 500), [dispatch, hasMore, page, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && page < 1) {
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
