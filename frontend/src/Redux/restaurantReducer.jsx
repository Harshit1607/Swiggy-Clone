import { Fetch_Restaurants, Restaurant_By_cuisine, Single_Restaurant } from './actiontypes'

const initialState = {
  cuisines : [],
  restaurants : [],
  singleRestaurant: null
}

function restaurantReducer(state = initialState, action){
  switch(action.type){
    case Fetch_Restaurants: 
        return{
          ...state,
          cuisines: action.payload.cuisines,
          restaurants : action.payload.restaurants
        }

    case Single_Restaurant:
        return{
          ...state,
          singleRestaurant: action.payload
        }

    case Restaurant_By_cuisine:
      return{
        ...state, 
        restaurants : action.payload.restaurants
      }
    default:
        return state;
}
}
export default restaurantReducer;