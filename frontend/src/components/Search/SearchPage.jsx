import React ,{useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import { fetchRestaurants, getRestaurantBySearch, getSingleRestaurant, getRestaurantByCuisine } from '../../Redux/restaurantActions';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';

const SearchPage = () => {
  const { searchRestaurant, loading, error, cuisines } = useSelector(state => state.restaurantReducer);
  const {hiddenLogin, hiddenSignup} = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function handleChange(e) {
    const text = e.target.value;
    if(text === ''){
      dispatch(fetchRestaurants());
      return;
    }
    dispatch(getRestaurantBySearch(text));
  }
  function handleRestaurant(id){
    dispatch(getSingleRestaurant({id}));
    navigate('/restaurant');
  }
  const [slide, setSlide] = useState([0, 1, 2, 3]);

  function nextSlide() {
    setSlide(slide.map(item => item + 1));
  }

  function prevSlide() {
    setSlide(slide.map(item => item - 1));
  }

  function handleCuisine(cuisine) {
    dispatch(getRestaurantByCuisine(cuisine));
    navigate('/cuisine');
  }

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
                <button onClick={prevSlide} style={slide[0]===0 ? {display: 'none'}: null}>&lt;</button>
                <button onClick={nextSlide} style={slide[3]===cuisines.length-1 ? {display: 'none'}: null}>&gt;</button>
              </div>
            </div>
            <div className="recom-container">
              {cuisines.map((item, index)=>{
                return(
                  <div className = {slide.includes(index)? "recom-img" : "recom-img recon-img-hidden"}>
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
