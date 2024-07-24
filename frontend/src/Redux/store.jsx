import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import restaurantReducer from './restaurantReducer.jsx'

const store = legacy_createStore(restaurantReducer, applyMiddleware(thunk));

export default store;