import TopRestaurants from '../components/Home/TopRestaurants';
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
  Restaurant_By_Search_Failure,
  Restaurant_By_Search_Success,
  Search_Dish_Request,
  Search_Dish_Failure,
  Search_Dish_Success,
} from './actiontypes';

const initialState = {
  cuisines: [],
  restaurants: [],
  singleRestaurant: null,
  loading: false,
  error: null,
  searchRestaurant: [],
  topRestaurants: [],
  searchDishes: [],
};

function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case Fetch_Restaurants_Request:
    case Single_Restaurant_Request:
    case Restaurant_By_Cuisine_Request:
    case Restaurant_By_Search_Request:
    case Search_Dish_Request:
      return {
        ...state,
        loading: true,
        error: null,
        searchRestaurant: [],
      };
    case Fetch_Restaurants_Success:
      return {
        ...state,
        loading: false,
        cuisines: action.payload.cuisines,
        restaurants: action.payload.restaurants,
        topRestaurants: action.payload.topRestaurants,
        searchRestaurant: [],
        searchDishes: []
      };
    case Single_Restaurant_Success:
      return {
        ...state,
        loading: false,
        singleRestaurant: action.payload.restaurant,
        searchRestaurant: [],
      };
    case Restaurant_By_Cuisine_Success:
      return {
        ...state,
        loading: false,
        restaurants: action.payload.restaurants,
        searchRestaurant: [],
      };
    case Restaurant_By_Search_Success:
      return{
        ...state,
        loading: false,
        searchRestaurant: action.payload.restaurants,
        cuisines: []
      };
    case Search_Dish_Success:
      return{
        ...state,
        loading: false,
        searchDishes: action.payload,
        searchRestaurant: [],
      }
    case Fetch_Restaurants_Failure:
    case Single_Restaurant_Failure:
    case Restaurant_By_Cuisine_Failure:
    case Restaurant_By_Search_Failure:
    case Search_Dish_Failure:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default restaurantReducer;
