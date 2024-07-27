import Cart from '../models/cart.js'

export const addItemToCart = async (req, res)=>{
  const {Item} = req.body
  const {restId} = req.body
  try {
    // Find the cart for the specified restaurant
    let cart = await Cart.findOne({ restaurantId: restId });

    if (!cart) {
      // If no cart exists for the restaurant, create a new cart
      cart = new Cart({
        restaurantId: restId,
        items: [],
        totalPrice: 0
      });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(item => item.itemId === Item.itemId);

    if (existingItem) {
      // If the item exists, increment the quantity by 1
      existingItem.quantity += 1;
    } else {
      // If the item does not exist, add it to the cart with quantity 1
      // Remove non-numeric characters from the price string and convert to number
      const itemPrice = parseFloat(Item.price.replace(/[^\d.-]/g, ''));

      cart.items.push({
        itemId: Item.itemId,
        item: Item.item,
        quantity: 1,
        price: itemPrice
      });
    }

    // Recalculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity);
      const itemTotal = itemPrice * itemQuantity;

      console.log(`Item Price: ${itemPrice}, Item Quantity: ${itemQuantity}, Item Total: ${itemTotal}`);

      if (isNaN(itemTotal)) {
        throw new Error(`Invalid item total: ${itemTotal}`);
      }

      return total + itemTotal;
    }, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to add Item' });
  }
}