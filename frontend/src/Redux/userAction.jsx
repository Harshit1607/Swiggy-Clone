import axios from 'axios'
import { Close_Auth, Get_Login, Get_Signup } from './actiontypes';

const API_URL = 'http://localhost:5000/';

export const getLogin = (dispatch) =>{
  dispatch({type: Get_Login})
}
export const getSignup = (dispatch) =>{
  dispatch({type: Get_Signup})
}
export const closeAuth = (dispatch) => {
  dispatch({type: Close_Auth})
}