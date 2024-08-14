import User from "../models/user.js";
import otpGenerator from "../Utils/otpGenerator.js";
import generateToken from "../Utils/generateOtpToken.js";
import verifyToken from "../Utils/verifyOtpToken.js";
import NodeCache from 'node-cache';
const otpCache = new NodeCache({ stdTTL: 300 });

let otp;

export const sendOtpLogin = async(req, res)=>{
    const {email} = req.body
  try {
    const existingUser = await User.findOne({email});
    if(!existingUser){
      return res.json({message: 'user does not exist'})
    }
    otp = otpGenerator();
    const token = generateToken(otp, email);
    otpCache.set(email, token);
    console.log(otp);
    res.json({otp, message: 'otp sent'})
  } catch (error) {
    res.status(500).json({ error: 'Failed to send otp' });
  }
}

export const sendOtpSignup = async(req, res)=>{
  const {email, phone, name} = req.body;
try {
  const existingUser = await User.findOne({email});

  if(existingUser){
  return res.json({message: 'user already exists'})
  }

  otp = otpGenerator();
  const token = generateToken(otp, email);
  otpCache.set(email, token);
  console.log(otp);
  res.json({message: 'otp sent', otp})
} catch (error) {
  res.status(500).json({ error: 'Failed to send otp' });
}
}

export const signup = async(req,res)=>{
  const {email, phone, name, userOtp} = req.body;
  try {
    const token = otpCache.get(email);
    if (!token) {
      return res.json({ message: 'OTP expired or not found' });
    }
    const decoded = verifyToken(token);
    if(decoded.otp == userOtp){
      otpCache.del(email); // Delete OTP after successful verification
      const newUser = new User({email, phone, name});
      newUser.save();
      return res.json({newUser, message: 'signed up'})
    }
    return res.json({message: 'Wrong Otp'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign up' });
  }
}

export const login = async(req,res)=>{
  const {email, userOtp} = req.body;
  try {
    const token = otpCache.get(email);
    if (!token) {
      return res.json({ message: 'OTP expired or not found' });
    }
    const decoded = verifyToken(token);
    if(decoded.otp == userOtp){
      otpCache.del(email); // Delete OTP after successful verification
      const existingUser = await User.findOne({email});
      return res.json({existingUser, message: 'logged in'})
    }
    return res.json({message: 'Wrong Otp'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to sign up' });
  }
}