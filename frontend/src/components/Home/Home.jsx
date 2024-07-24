import React from 'react'
import Recomendation from './Recomendation'
import Restaurants from './Restaurants'


const Home = () => {
  return (
    <div className="main">
      <Recomendation />
      <Restaurants />
    </div>
  )
}

export default Home