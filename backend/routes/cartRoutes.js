import express from 'express';
import { addItemToCart, cartSync, deleteItemFromCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCart)
router.post('/add', addItemToCart);
router.delete('/delete', deleteItemFromCart);
router.post('/sync', cartSync);

export default router;