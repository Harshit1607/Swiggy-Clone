import axios from 'axios';
import { 
  Fetch_Restaurants_Request, 
  Fetch_Restaurants_Success, 
  Fetch_Restaurants_Failure, 
  Single_Restaurant_Request, 
  Single_Restaurant_Success, 
  Single_Restaurant_Failure, 
  Restaurant_By_Cuisine_Request, 
  Restaurant_By_Cuisine_Success, 
  Restaurant_By_Cuisine_Failure, 
  Restaurant_By_Search_Request,
  Restaurant_By_Search_Success,
  Restaurant_By_Search_Failure,
} from './actiontypes';

const API_URL = 'http://localhost:5000/';

export const fetchRestaurants = () => async (dispatch) => {
  dispatch({ type: Fetch_Restaurants_Request });
  try {
    const result = await axios.get(`${API_URL}restaurants`);
    dispatch({ type: Fetch_Restaurants_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Fetch_Restaurants_Failure, error: error.message });
  }
}

export const getSingleRestaurant = ({ id }) => async (dispatch) => {
  dispatch({ type: Single_Restaurant_Request });
  try {
    console.log(id)
    const result = await axios.get(`${API_URL}restaurants/${id}`);
    dispatch({ type: Single_Restaurant_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Single_Restaurant_Failure, error: error.message });
  }
}

export const getRestaurantByCuisine = (cuisine) => async (dispatch) => {
  dispatch({ type: Restaurant_By_Cuisine_Request });
  try {
    const result = await axios.get(`${API_URL}restaurants/cuisine/${cuisine}`);
    dispatch({ type: Restaurant_By_Cuisine_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Restaurant_By_Cuisine_Failure, error: error.message });
  }
}

export const getRestaurantBySearch = (text) => async (dispatch) => {
  dispatch({ type: Restaurant_By_Search_Request });
  try {
    const result = await axios.get(`${API_URL}restaurants/search/${text}`);
    dispatch({ type: Restaurant_By_Search_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Restaurant_By_Search_Failure, error: error.message });
  }
}
