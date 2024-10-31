import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', 
    required: true
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
