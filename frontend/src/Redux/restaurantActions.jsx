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
  Search_Dish_Request,
  Search_Dish_Failure,
  Search_Dish_Success,
  No_Text,
  Cart_Restaurant_Request,
  Cart_Restaurant_Success,
  Cart_Restaurant_Failure,
} from './actiontypes';

const API_URL = 'http://localhost:5000/';

export const fetchRestaurants = (page = 1) => async (dispatch) => {
  dispatch({ type: Fetch_Restaurants_Request });
  try {
    const result = await axios.get(`${API_URL}restaurants`, { params: { page } });
    dispatch({ type: Fetch_Restaurants_Success, payload: {...result.data, page} });
  } catch (error) {
    dispatch({ type: Fetch_Restaurants_Failure, error: error.message });
  }
}

export const getSingleRestaurant = ({ id }) => async (dispatch) => {
  dispatch({ type: Single_Restaurant_Request });
  try {
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

export const getDishBySearch = (id, text) => async (dispatch) => {
  dispatch({type: Search_Dish_Request});
  try {
    const result = await axios.get(`${API_URL}restaurants/search/menu/items`, {
      params: {text, id},
    })
    dispatch({type: Search_Dish_Success, payload: result.data});
  } catch (error) {
    dispatch({type: Search_Dish_Failure, error: error.message})
  }
}

export const noText = () => (dispatch) => {
  dispatch({type: No_Text})
}

export const getCartRestaurant = ({ id }) => async (dispatch) => {
  dispatch({ type: Cart_Restaurant_Request });
  try {
    const result = await axios.get(`${API_URL}restaurants/cart/${id}`);
    dispatch({ type: Cart_Restaurant_Success, payload: result.data });
  } catch (error) {
    dispatch({ type: Cart_Restaurant_Failure, error: error.message });
  }
}