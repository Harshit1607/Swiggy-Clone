import express from 'express';
import { addItemToCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addItemToCart);

export default router;