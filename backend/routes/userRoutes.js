import express from 'express';
import { editOtp, editUser, login, sendOtpLogin, sendOtpSignup, signup } from '../controllers/userController.js';


const router = express.Router();

router.post('/loginOtp', sendOtpLogin);
router.post('/signupOtp', sendOtpSignup);
router.post('/login', login);
router.post('/signup', signup);
router.post('/editOtp', editOtp);
router.put('/editUser', editUser)
export default router;