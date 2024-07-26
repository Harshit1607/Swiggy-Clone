import express from 'express';
import { getAllRestaurants, getRestaurantBycuisine, getRestaurantById, getRestaurantBysearch } from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:restaurantId', getRestaurantById);
router.get('/cuisine/:cuisine', getRestaurantBycuisine)
router.get('/search/:search', getRestaurantBysearch)
export default router;