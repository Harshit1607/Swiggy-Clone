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
export const getRestaurantBycuisine = async (req, res) => {
  const cuisine = req.params.cuisine;
  try {
    const restaurants = await Restaurant.find({cuisine: {$regex: cuisine}});
    res.status(200).json({restaurants});
  } catch (error) {
    res.status(500).json({ error: 'Failed to get restaurant' });
  }
}
export const getRestaurantBysearch = async (req, res) => {
  const text = req.params.search;
  try {
    const restaurants = await Restaurant.find({name: {$regex: text, $options: 'i'}});
    res.status(200).json({restaurants});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to get restaurant' });
  }
}

