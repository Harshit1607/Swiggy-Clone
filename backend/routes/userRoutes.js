import express from 'express';
import { editOtp, editUser, login, saveAddress, sendOtpLogin, sendOtpSignup, signup, updateAddress } from '../controllers/userController.js';


const router = express.Router();

router.post('/loginOtp', sendOtpLogin);
router.post('/signupOtp', sendOtpSignup);
router.post('/login', login);
router.post('/signup', signup);
router.post('/editOtp', editOtp);
router.put('/editUser', editUser);
router.post('/saveAddress', saveAddress);
router.post('/updateAddress', updateAddress);
export default router;