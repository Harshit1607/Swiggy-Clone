import Cart from '../models/cart.js'
import cron from 'node-cron'; 

export const getCart = async (req, res) =>{
  const {userId} = req.query;
  const {cartId} = req.query;
  try {
    let cart;
    if(userId){
      cart = await Cart.findOne({userId: userId});
    }else{
      cart = await Cart.findById(cartId); 
      if (cart && cart.userId) {
        cart = new Cart({
          restaurantId: "", // Use existing restaurantId
          items: [],
          totalPrice: 0
        });
      }
    }
    
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get cart' });
  }
}

export const addItemToCart = async (req, res)=>{
  const {Item} = req.body
  const {restId} = req.body
  const {userId} = req.body
  const{cartId} = req.body
  try {
    
    let cart;
    
    // When a user is logged in
    if (userId) {
      
      // Find the cart for the specified restaurant and user
      cart = await Cart.findOne({userId: userId });

    

      if (cart && cart.restaurantId.toString() !== restId.toString()) {
        cart.items = []; // Clear old items
        cart.totalPrice = 0; // Reset total price
        cart.restaurantId = restId; // Update with the new restaurantId
      }

      

      if (!cart) {
        // If no cart exists for this user and restaurant, create a new cart
        cart = new Cart({
          restaurantId: restId,
          userId: userId, // Associate the userId with the cart
          items: [],
          totalPrice: 0
        });
      }
    } else {
      
      if(cartId){
        // When there is no user, check if cartId is provided in the request
        // Find the cart by cartId if provided
        cart = await Cart.findById(cartId);

        if (cart && cart.userId) {
          cart = new Cart({
            restaurantId: restId,
            items: [],
            totalPrice: 0
          })
        };
        
        // If found and the restaurantId is different, clear old items and update restaurantId
        if (cart && cart.restaurantId.toString() !== restId.toString()) {
          cart.items = []; // Clear old items
          cart.totalPrice = 0; // Reset total price
          cart.restaurantId = restId; // Update with the new restaurantId
        }
      }else{
          cart = new Cart({
            restaurantId: restId,
            items: [],
            totalPrice: 0
          });
      }
      
      }
      // If no cart exists for the restaurant, create a new cart
      

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

      if (isNaN(itemTotal)) {
        throw new Error(`Invalid item total: ${itemTotal}`);
      }

      return total + itemTotal;
    }, 0);

    // Save the updated cart
    await cart.save();    

    res.status(200).json({ cart });
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to add Item' });
  }
}

export const deleteItemFromCart = async (req, res) => {
  const { Item, userId, cartId } = req.body;

  try {
    let cart;

    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (cartId) {
      cart = await Cart.findById(cartId);

      // If the cart exists and is associated with a user, create a new cart
      if (cart && cart.userId) {
        cart = new Cart({
          restaurantId: '', // Use the existing restaurantId
          items: [],
          totalPrice: 0
        });
      }
    }

    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const existingItem = cart.items.find(item => item.itemId === Item.itemId);

    if (existingItem) {
      existingItem.quantity -= 1;
      if (existingItem.quantity === 0) {
        cart.items = cart.items.filter(item => item.itemId !== Item.itemId);
      }
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    if (cart.items.length === 0) {
      // If the cart is empty, delete it
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ cart: null });
    } else {
      await cart.save();
      return res.status(200).json({ cart });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item from cart' });
  }
};


export const cartSync = async (req, res) => {
  const {userId} = req.body
  const{cartId} = req.body
  try {
    let cart;

    if (userId) {
      // Check if there's an existing cart associated with the user
      cart = await Cart.findOne({ userId });

      if (!cart && cartId) {
        // If no cart is associated with the user but a cartId exists, associate userId with this cartId
        cart = await Cart.findByIdAndUpdate(
          cartId,
          { userId },
          { new: true } // This option returns the updated document
        );
      }
    } else if (cartId) {
      // If no userId, return cart based on cartId alone
      cart = await Cart.findById(cartId);
    }

    if (cart) {
      
      res.status(200).json(cart);
    } else {
      cart = null;
    
      // If no cart is found and no cartId was provided
      res.status(200).json(cart);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to sync cart' });
  }
}

const deleteOldCarts = async () => {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  try {
    const result = await Cart.deleteMany({
      userId: null,
      updatedAt: { $lt: thirtyMinutesAgo }, // Check if the cart was last updated over 30 minutes ago
    });
    
    console.log(`${result.deletedCount} old carts deleted.`);
  } catch (error) {
    console.error('Error deleting old carts:', error);
  }
};

// Schedule the task to run every 10 minutes
cron.schedule('*/10 * * * *', deleteOldCarts);