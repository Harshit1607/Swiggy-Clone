import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar'
import { getRestaurantBySearch, getSingleRestaurant, getRestaurantByCuisine, noText } from '../../../Redux/restaurantActions';
import Login from '../../Auth/Login';
import Signup from '../../Auth/Signup';
import { Debouncing } from '../../../Utils/Debouncing';
import Carousel from '../../../Utils/Carousel/Carousel';
import styles from './SearchPage.module.css'; // Import the CSS module

const SearchPage = () => {
  const { searchRestaurant, loading, error, cuisines } = useSelector(state => state.restaurantReducer);
  const { hiddenLogin, hiddenSignup } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const debouncedSearch = useCallback(Debouncing((text) => {
    dispatch(getRestaurantBySearch(text));
  }, 800), [dispatch]);

  function handleChange(e) {
    const text = e.target.value;
    if (text === '') {
      dispatch(noText());
      return;
    }
    debouncedSearch(text);
  }

  function handleRestaurant(id) {
    dispatch(getSingleRestaurant({ id }));
    navigate('/restaurant');
  }

  function handleCuisine(cuisine) {
    dispatch(getRestaurantByCuisine(cuisine));
    navigate('/cuisine');
  }

  return (
    <>
      <Login />
      <Signup />
      <Navbar />
      <div className={styles.main} style={!hiddenLogin || !hiddenSignup ? { overflow: "hidden", height: "calc(100vh - 80px)" } : null}>
        <div className={styles.searchBox}>
          <input placeholder='Search...' onChange={handleChange} />
        </div>
        <div className={styles.searchRestaurants}>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {cuisines.length > 0 ? 
            <div className={styles.searchRecomendation}>
              <div className={styles.recomHeading}>
                <span>Popular Cuisines</span>
              </div>
              <Carousel length={5}>
                {cuisines.map((item, index) => (
                  <div className={styles.recomImg} key={index}>
                    <img src={item.image} onClick={() => handleCuisine(item.cuisine)} />
                  </div>
                ))}
              </Carousel>
            </div>
            : searchRestaurant.length > 0 && searchRestaurant.map((item) => (
              <div className={styles.searchRestCol} key={item.id} onClick={() => handleRestaurant(item._id)}>
                <img src={item.image} alt={item.name} />
                <div className={styles.searchRestInfo}>
                  <span>{item.name}</span>
                  <span>Restaurant</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default SearchPage;
