import express from 'express';
import { addItemToCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCart)
router.post('/add', addItemToCart);

export default router;