import express from 'express';
import { sendOtpLogin, sendOtpSignup } from '../controllers/userController.js';


const router = express.Router();

router.post('/loginOtp', sendOtpLogin);
router.post('/signupOtp', sendOtpSignup);
export default router;