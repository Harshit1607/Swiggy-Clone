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
  Restaurant_By_Search_Zero
} from './actiontypes';

const initialState = {
  cuisines: [],
  restaurants: [],
  singleRestaurant: null,
  loading: false,
  error: null,
  searchRestaurant: []
};

function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case Fetch_Restaurants_Request:
    case Single_Restaurant_Request:
    case Restaurant_By_Cuisine_Request:
    case Restaurant_By_Search_Request:
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
        searchRestaurant: [],
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
    case Fetch_Restaurants_Failure:
    case Single_Restaurant_Failure:
    case Restaurant_By_Cuisine_Failure:
    case Restaurant_By_Search_Failure:
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
