import mongoose from 'mongoose';


const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: Number, 
    ref: 'Item',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});


const cartSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User', // Assuming you have a User model
  //   required: true
  // },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
  }
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
