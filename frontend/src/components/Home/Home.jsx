import React from 'react'
import Recomendation from './Recomendation'
import Restaurants from './Restaurants'
import { useDispatch } from 'react-redux'
import { fetchRestaurants } from '../../Redux/actions'

const Home = () => {
  const dispatch = useDispatch();
  dispatch(fetchRestaurants());
  return (
    <div className="main">
      <Recomendation />
      <Restaurants />
    </div>
  )
}

export default Home