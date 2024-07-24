import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import restaurantRoutes from './routes/restaurantRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Swiggy");

app.use('/restaurants', restaurantRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});