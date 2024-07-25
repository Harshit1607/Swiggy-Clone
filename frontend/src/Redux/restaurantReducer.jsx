import { Fetch_Restaurants, Single_Restaurant } from './actiontypes'

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

    default:
        return state;
}
}
export default restaurantReducer;