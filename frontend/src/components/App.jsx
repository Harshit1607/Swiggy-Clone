import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './Navbar'
import Home from './Home/Home'
import RestaurantHome from './Restaurant/RestaurantHome/RestaurantHome'
import Cuisinehome from './Cuisines/Cuisinehome';
import SearchPage from './Search/SearchPage/SearchPage';
import Cart from './Cart/CartHome/Cart';
import MenuSearchPage from './Search/MenuSearchPage/MenuSearchPage';
// import Login from './Auth/Login'
// import Signup from './Auth/Signup'
import PrivateUser from './Private/PrivateUser';
import UserHome from './User/UserHome/UserHome';
import { useDispatch, useSelector } from 'react-redux';
import { cartExpiration, cartSync, fetchCart } from '../Redux/cartActions';

const App = () => {
  const {user} = useSelector(state => state.userReducer);
  const {cart, cartSynced} = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();

  const userId = user ? user._id : "";
  const cartId = cart ? cart._id : "";
  useEffect(()=>{
    if(user && !cartSynced){
      dispatch(cartSync({userId, cartId}))
    }
  }, [cartSynced, user])
  useEffect(() => {
    if (userId) {
      // If userId exists, fetch the cart using userId
      dispatch(cartExpiration());
      dispatch(fetchCart({ cartId, userId })); // Fetch cart with userId only
  } else if (cartId) {
      // If userId does not exist but cartId exists, fetch the cart using cartId
      dispatch(cartExpiration());
      dispatch(fetchCart({ cartId, userId })); // Fetch cart with cartId only
  }
  }, [dispatch, userId, cartId]);


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
