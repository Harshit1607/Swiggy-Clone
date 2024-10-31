import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/createOrder', createOrder)
router.post('/verify', verifyPayment)

export default router;