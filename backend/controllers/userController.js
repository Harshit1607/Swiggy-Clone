import User from "../models/user.js";
import otpGenerator from "../Utils/otpGenerator.js";

let otp;

export const sendOtpLogin = async(req, res)=>{
    const {email} = req.body
  try {
    const existingUser = await User.findOne({email});
    if(!existingUser){
      return res.json({message: 'user does not exist'})
    }
    otp = otpGenerator();
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
  console.log(otp);
  res.json({message: 'otp sent', otp})
} catch (error) {
  res.status(500).json({ error: 'Failed to send otp' });
}
}

export const signup = async(req,res)=>{
  const {email, phone, name, userOtp} = req.body;
  try {
    console.log(userOtp)
    if(otp == userOtp){
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
    if(otp == userOtp){
      const existingUser = await User.findOne({email});
      return res.json({existingUser, message: 'signed up'})
    }
    return res.json({message: 'Wrong Otp'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign up' });
  }
}