import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
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

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  items: [orderItemSchema],
  PaymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment', 
    required: false
  },
  amount: {
    type: Number,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
