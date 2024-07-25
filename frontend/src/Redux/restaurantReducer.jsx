import { 
  Fetch_Restaurants_Request, 
  Fetch_Restaurants_Success, 
  Fetch_Restaurants_Failure, 
  Single_Restaurant_Request, 
  Single_Restaurant_Success, 
  Single_Restaurant_Failure, 
  Restaurant_By_Cuisine_Request, 
  Restaurant_By_Cuisine_Success, 
  Restaurant_By_Cuisine_Failure 
} from './actiontypes';

const initialState = {
  cuisines: [],
  restaurants: [],
  singleRestaurant: null,
  loading: false,
  error: null,
};

function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case Fetch_Restaurants_Request:
    case Single_Restaurant_Request:
    case Restaurant_By_Cuisine_Request:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Fetch_Restaurants_Success:
      return {
        ...state,
        loading: false,
        cuisines: action.payload.cuisines,
        restaurants: action.payload.restaurants,
      };
    case Single_Restaurant_Success:
      return {
        ...state,
        loading: false,
        singleRestaurant: action.payload.restaurant,
      };
    case Restaurant_By_Cuisine_Success:
      return {
        ...state,
        loading: false,
        restaurants: action.payload.restaurants,
      };
    case Fetch_Restaurants_Failure:
    case Single_Restaurant_Failure:
    case Restaurant_By_Cuisine_Failure:
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
