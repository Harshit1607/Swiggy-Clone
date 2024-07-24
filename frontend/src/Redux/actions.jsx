import axios from 'axios'
import { Fetch_Restaurants } from './actiontypes'

const API_URL = 'http://localhost:5000/'

export const fetchRestaurants =  () => async (dispatch)=>{
  try{
    const result = await axios.get(`${API_URL}restaurants`);
    dispatch({ type: Fetch_Restaurants, payload: result.data });
  } catch (err){
    alert(err.message);
  }
}