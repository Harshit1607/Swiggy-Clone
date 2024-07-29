import express from 'express';
import { addItemToCart, deleteItemFromCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCart)
router.post('/add', addItemToCart);
router.delete('/delete', deleteItemFromCart);

export default router;