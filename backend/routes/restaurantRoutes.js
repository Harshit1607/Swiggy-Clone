import express from 'express';
import { getAllRestaurants, getRestaurantBycuisine, getRestaurantById } from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:restaurantId', getRestaurantById);
router.get('/cuisine/:cuisine', getRestaurantBycuisine)
export default router;