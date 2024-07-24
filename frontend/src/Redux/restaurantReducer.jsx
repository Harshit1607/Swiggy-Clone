import { Fetch_Restaurants } from './actiontypes'

const initialState = {
  cuisines : [],
  restaurants : [],
}

function restaurantReducer(state = initialState, action){
  switch(action.type){
    case Fetch_Restaurants: 
        return{
          ...state,
          cuisines: action.payload.cuisines,
          restaurants : action.payload.restaurants
        }

        
    default:
        return state;
}
}
export default restaurantReducer;