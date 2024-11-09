import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import restaurantReducer from './restaurantReducer.jsx'
import cartReducer from './cartReducer.jsx'
import userReducer from "./userReducer.jsx";
import paymentReducer from "./paymentReducer.jsx";
import OrderReducer from "./OrderReducer.jsx";

const rootReducer = combineReducers({
  restaurantReducer,
  cartReducer,
  userReducer,
  paymentReducer,
  OrderReducer
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;