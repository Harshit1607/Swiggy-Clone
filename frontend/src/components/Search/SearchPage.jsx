import React ,{useCallback, useState, useRef}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import { fetchRestaurants, getRestaurantBySearch, getSingleRestaurant, getRestaurantByCuisine, noText } from '../../Redux/restaurantActions';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import { Debouncing } from '../../Utils/Debouncing';

const SearchPage = () => {
  const { searchRestaurant, loading, error, cuisines } = useSelector(state => state.restaurantReducer);
  const {hiddenLogin, hiddenSignup} = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const debouncedSearch = useCallback(Debouncing((text)=>{
    dispatch(getRestaurantBySearch(text));
  }, 800), [dispatch])

  function handleChange(e) {
    const text = e.target.value;
    if(text === ''){
      dispatch(noText());
      return;
    }
    debouncedSearch(text);
  }
  function handleRestaurant(id){
    dispatch(getSingleRestaurant({id}));
    navigate('/restaurant');
  }

  function handleCuisine(cuisine) {
    dispatch(getRestaurantByCuisine(cuisine));
    navigate('/cuisine');
  }

  const carouselRef = useRef(null);
  const slidesToShow = 5

  const nextSlide = () => {
    if (carouselRef.current) {
        const scrollAmount = carouselRef.current.clientWidth / slidesToShow;
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
      if (carouselRef.current) {
          const scrollAmount = carouselRef.current.clientWidth / slidesToShow;
          carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <>
    <Login />
    <Signup />
    <Navbar />
    <div className="main" style={!hiddenLogin || !hiddenSignup ? {overflow: "hidden", height: "calc(100vh - 80px)"} : null}>
      <div className='search-box'>
        <input placeholder='Search...' onChange={handleChange} />
      </div>
      <div className='search-restaurants'>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {cuisines.length > 0? 
            <div className="search-recomendation">
            <div className="recom-heading">
              <span>Popular Cuisines</span>
              <div>
                <button onClick={prevSlide} >&lt;</button>
                <button onClick={nextSlide} >&gt;</button>
              </div>
            </div>
            <div className="recom-container" ref={carouselRef}>
              {cuisines.map((item, index)=>{
                return(
                  <div className = "recom-img">
                    <img src={item.image} onClick={()=>handleCuisine(item.cuisine)}/>
                  </div>
                )
              })}
            </div>
          </div>
        : searchRestaurant.length > 0 && searchRestaurant.map((item) => (
          <div className="search-rest-col" key={item.id}  onClick={()=>handleRestaurant(item._id)}>
            <img src={item.image} alt={item.name} />
            <div className="search-rest-info">
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
