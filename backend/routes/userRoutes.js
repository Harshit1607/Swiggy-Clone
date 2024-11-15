import express from 'express';
import { addToFav, deleteAddress, editOtp, editUser, login, saveAddress, sendOtpLogin, sendOtpSignup, signup, updateAddress } from '../controllers/userController.js';


const router = express.Router();

router.post('/loginOtp', sendOtpLogin);
router.post('/signupOtp', sendOtpSignup);
router.post('/login', login);
router.post('/signup', signup);
router.post('/editOtp', editOtp);
router.put('/editUser', editUser);
router.post('/saveAddress', saveAddress);
router.post('/updateAddress', updateAddress);
router.post('/deleteAddress', deleteAddress);
router.post('/addFav', addToFav);
export default router;