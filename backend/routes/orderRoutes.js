import express from 'express';
import { fetchOrders, reOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', fetchOrders);
router.get('/reorder', reOrder);

export default router;