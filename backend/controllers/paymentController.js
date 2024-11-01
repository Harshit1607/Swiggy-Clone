import Order from '../models/order.js'
import Cart from '../models/cart.js'
import Payment from '../models/payment.js'
import crypto from "crypto";
import NodeCache from 'node-cache';
import { instance } from '../server.js';
const cache = new NodeCache();

const PAYMENT_TIMEOUT = 5 * 60 * 1000;

export const createOrder = async (req, res) => {
  const {amount, userId} = req.body
  
  try {
    const options = {
      amount: Math.floor(Number(amount * 100)),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    

    const cart = await Cart.findOne({userId: userId});

    const newOrder = new Order({
      restaurantId: cart.restaurantId,
      items: cart.items,
      userId,
      amount
    });

    const userOrder = await newOrder.save();
    cache.set(order.id.toString(), Date.now());
    res.status(200).json({
      success: true,
      order,
      userOrder
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body.paymentDetails;
  const {orderId} = req.body;

  try {

    // Retrieve order creation time from the cache
    const orderCreationTime = cache.get(razorpay_order_id);

    if (!orderCreationTime) {
      return res.status(400).json({ success: false, message: 'Order not found or expired.' });
    }

    // Check if the order was created within the last 5 minutes
    const currentTime = Date.now();
    if (currentTime - orderCreationTime > PAYMENT_TIMEOUT) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: payment not completed within 5 minutes.',
      });
    }

    // Generate expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
    .createHmac("sha256", "iM62T5FAUW3bbF58vTEQzZ5h")
    .update(body.toString())
    .digest("hex");
    
    const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    const payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    });
    const userOrder = await Order.findByIdAndUpdate(
      orderId,
      { PaymentId: payment._id },
      { new: true } // This option returns the updated document
    );
    const userId = userOrder.userId;
    await Cart.deleteOne({userId});
    res.status(200).json({
      success: true,
      userOrder,
    })

  } else {
    res.status(400).json({
      success: false,
    });
  }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to verify' });
  
  }
}