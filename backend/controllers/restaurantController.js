import Restaurant from '../models/restaurants.js';
import Cuisine from '../models/cuisine.js';

export const getAllRestaurants = async (req, res) => {
  try {
      const restaurants = await Restaurant.find();
      const cuisines = await Cuisine.find();
      res.status(200).json({restaurants, cuisines});
  } catch (error) {
      res.status(500).json({ error: 'Failed to get restaurants' });
  }
};

