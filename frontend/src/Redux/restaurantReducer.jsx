
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
  No_Text,
  Cart_Restaurant_Request,
  Cart_Restaurant_Failure,
  Cart_Restaurant_Success,
  Fav_Rest_Failure,
  Fav_Rest_Request,
  Fav_Rest_Success,
} from './actiontypes';

const initialState = {
  cuisines: [],
  restaurants: [],
  singleRestaurant:  localStorage.getItem('singleRestaurant')? JSON.parse(localStorage.getItem('singleRestaurant')): null,
  cartRestaurant: localStorage.getItem('cartRestaurant')? JSON.parse(localStorage.getItem('cartRestaurant')): null,
  loading: false,
  error: null,
  searchRestaurant: [],
  topRestaurants: [],
  searchDishes: [],
  cuisineRestaurants: [],
  favRest: localStorage.getItem('favRest') && JSON.parse(localStorage.getItem('favRest')) && JSON.parse(localStorage.getItem('favRest')).length > 0 ? JSON.parse(localStorage.getItem('favRest')): [],
  page: 0,
  hasMore: true,
};

function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case Fetch_Restaurants_Request:
    case Single_Restaurant_Request:
    case Restaurant_By_Cuisine_Request:
    case Restaurant_By_Search_Request:
    case Search_Dish_Request:
    case Cart_Restaurant_Request:
    case Fav_Rest_Request:
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
        restaurants: [...state.restaurants, ...action.payload.restaurants],
        topRestaurants: action.payload.topRestaurants,
        hasMore: action.payload.hasMore,
        page: action.payload.page ,
      };
    case Single_Restaurant_Success:
      localStorage.setItem('singleRestaurant', JSON.stringify(action.payload.restaurant))
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
        cuisineRestaurants: action.payload.restaurants,
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
    case No_Text:
      return{
        ...state,
        searchRestaurant: [],
        searchDishes: []
      }
    case Cart_Restaurant_Success:
      localStorage.setItem('cartRestaurant', JSON.stringify(action.payload.restaurant))
      return {
        ...state,
        loading: false,
        cartRestaurant: action.payload.restaurant,
        searchRestaurant: [],
      };
    case Fav_Rest_Success:
      localStorage.setItem('favRest', JSON.stringify(action.payload.favRestaurants))
      return {
        ...state,
        loading: false,
        favRest: action.payload.favRestaurants,
        searchRestaurant: [],
      };
    case Fetch_Restaurants_Failure:
    case Single_Restaurant_Failure:
    case Restaurant_By_Cuisine_Failure:
    case Restaurant_By_Search_Failure:
    case Search_Dish_Failure:
    case Cart_Restaurant_Failure:
    case Fav_Rest_Failure:
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
