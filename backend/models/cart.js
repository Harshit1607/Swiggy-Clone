import mongoose from 'mongoose';


const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: Number, 
    ref: 'Item',
    required: true
  },
  item: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
  },
  price: {
    type: String,
    required: true
  }
});

const cartSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
  }
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
