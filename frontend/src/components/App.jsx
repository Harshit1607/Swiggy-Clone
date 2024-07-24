import React from 'react'
import Navbar from './Navbar'
import Home from './Home/Home'
import RestaurantHome from './Restaurant/RestaurantHome'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Home /> */}
      <RestaurantHome />
    </div>
  )
}

export default App
