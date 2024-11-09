import Order from '../models/order.js'
import Restaurant from '../models/restaurants.js';
import Cart from '../models/cart.js'

export const fetchOrders = async (req, res) => {
  const {userId} = req.query;
  try {
    // Fetch orders for the specific user
  const orders = await Order.find({ userId }).lean(); // Mongoose's find() already returns an array

  // Fetch restaurant data for each order and assign it
  const ordersWithRestaurants = await Promise.all(
    orders.map(async (order) => {
      order.restaurant = await Restaurant.findById(order.restaurantId);
      return order;
    })
  );
  console.log(ordersWithRestaurants)
  // Send the result
  return res.status(200).json({ orders: ordersWithRestaurants });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
}

export const reOrder = async (req, res) => {
  const {userId, items, restaurantId} = req.query
  try {
    let cart;
    cart = await Cart.findOne({ userId });
    if(cart){
      await Cart.findOneAndDelete({userId})
    }
    cart = new Cart({
      restaurantId, // Use existing restaurantId
      items,
      userId,
      totalPrice: 0
    });
    cart.totalPrice = cart.items.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity);
      const itemTotal = itemPrice * itemQuantity;

      if (isNaN(itemTotal)) {
        throw new Error(`Invalid item total: ${itemTotal}`);
      }

      return total + itemTotal;
    }, 0);

    // Save the updated cart
    await cart.save();
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add Item' });
  }
  
}