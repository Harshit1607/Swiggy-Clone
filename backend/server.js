import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import restaurantRoutes from './routes/restaurantRoutes.js';
import cartRoutes from './routes/cartRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongourl = process.env.MONGOURL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect(mongourl);

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.use('/restaurants', restaurantRoutes);
app.use('/cart', cartRoutes)
app.use('/user', userRoutes)
app.use('/orders', orderRoutes)
app.use('/payment', paymentRoutes)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});