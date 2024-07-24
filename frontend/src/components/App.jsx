import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'
import Home from './Home/Home'
import RestaurantHome from './Restaurant/RestaurantHome'

const App = () => {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/restaurant' element={<RestaurantHome />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
