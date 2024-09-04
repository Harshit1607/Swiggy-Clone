import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'
import Home from './Home/Home'
import RestaurantHome from './Restaurant/RestaurantHome/RestaurantHome'
import Cuisinehome from './Cuisines/Cuisinehome';
import SearchPage from './Search/SearchPage/SearchPage';
import Cart from './Cart/Cart';
import MenuSearchPage from './Search/MenuSearchPage/MenuSearchPage';
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import PrivateUser from './Private/PrivateUser';
import UserHome from './User/UserHome/UserHome';

const App = () => {
  return (
    <Router>
    <div>
      <Routes>
        <Route element={<PrivateUser />}>
          <Route path='/user' element={<UserHome />}/>
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/restaurant' element={<RestaurantHome />} />
        <Route path='/cuisine' element={<Cuisinehome />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path='/search/menu' element={<MenuSearchPage />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
