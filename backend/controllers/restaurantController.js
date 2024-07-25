import Restaurant from '../models/restaurants.js';
import Cuisine from '../models/cuisine.js';

export const getAllRestaurants = async (req, res) => {
  try {
      const restaurants = await Restaurant.find();
      const cuisines = await Cuisine.find();
      res.status(200).json({restaurants, cuisines});
  } catch (error) {
      res.status(500).json({ error: 'Failed to get restaurants or cuisines' });
  }
};
export const getRestaurantById = async (req, res) => {
  const  {restaurantId } = req.params;
  try {
    console.log(restaurantId)
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
      res.status(200).json({ restaurant });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get restaurant' });
  }
};

