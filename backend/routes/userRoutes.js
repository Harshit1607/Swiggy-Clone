import express from 'express';
import { login, sendOtpLogin, sendOtpSignup, signup } from '../controllers/userController.js';


const router = express.Router();

router.post('/loginOtp', sendOtpLogin);
router.post('/signupOtp', sendOtpSignup);
router.post('/login', login);
router.post('/signup', signup);
export default router;