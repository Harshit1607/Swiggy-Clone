import User from "../models/user.js";
import otpGenerator from "../Utils/otpGenerator.js";

let otp;

export const sendOtpLogin = async(req, res)=>{
    const {email} = req.body
  try {
    console.log(email)
    const existingUser = await User.findOne({email});
    if(!existingUser){
      return res.json({message: 'user does not exist'})
    }
    otp = otpGenerator();
    console.log(otp);
    res.json({existingUser, message: 'otp sent'})
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

}