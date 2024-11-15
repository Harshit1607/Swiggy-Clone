import express from 'express';
import { favRestaurants, getAllRestaurants, getDishBysearch, getRestaurantBycuisine, getRestaurantById, getRestaurantBysearch } from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:restaurantId', getRestaurantById);
router.get('/cuisine/:cuisine', getRestaurantBycuisine);
router.get('/search/:search', getRestaurantBysearch);
router.get('/search/menu/items', getDishBysearch);
router.get('/cart/:restaurantId', getRestaurantById);
router.get('/fav/:userId', favRestaurants);
export default router;