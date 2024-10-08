import User from "../models/user.js";
import otpGenerator from "../Utils/otpGenerator.js";
import generateToken from "../Utils/generateOtpToken.js";
import verifyToken from "../Utils/verifyOtpToken.js";
import NodeCache from 'node-cache';
import sendOtpEmail from "../Utils/sendEmail.js";
const otpCache = new NodeCache({ stdTTL: 300 });

export const sendOtpLogin = async(req, res)=>{
    const {email} = req.body
  try {
    const existingUser = await User.findOne({email});
    if(!existingUser){
      return res.json({message: 'user does not exist'})
    }
    const otp = otpGenerator();
    const token = generateToken(otp, email);
    otpCache.set(email, token);
    console.log(otp);
    await sendOtpEmail(email, otp);
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

  const otp = otpGenerator();
  const token = generateToken(otp, email);
  otpCache.set(email, token);
  console.log(otp);
  await sendOtpEmail(email, otp);
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
      req.user = newUser;
      return res.json({newUser, message: 'signed up'});
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
      req.user = existingUser;
      return res.json({existingUser, message: 'logged in'})
    }
    return res.json({message: 'Wrong Otp'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to sign up' });
  }
}

export const editOtp = async(req, res) => {
  const {email, phone} = req.body;
  try {
    otp = otpGenerator();
    const token = generateToken(otp, email);
    otpCache.set(email, token);
    console.log(otp);
    await sendOtpEmail(email, otp);
    res.json({message: 'otp sent', show: true})
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign up' });
  }
}

export const editUser = async (req, res) => {
  const {email, phone, newEmail, newPhone, userOtp} = req.body;
  try {
    const token = otpCache.get(email);
    if (!token) {
      return res.json({ message: 'OTP expired or not found' });
    }
    const decoded = verifyToken(token);
    if(decoded.otp == userOtp){
      otpCache.del(email); // Delete OTP after successful verification
      const updatedUser = await User.findOneAndUpdate(
        { email: email }, // Filter to find the user
        { email: newEmail, phone: newPhone }, // Fields to update
        { new: true } // Option to return the updated document
      );
      req.user = updatedUser;
      return res.json({updatedUser, message: 'updated user'})
    }
    return res.json({message: 'Wrong Otp'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit' });
  }
}

export const saveAddress = async (req, res) =>{
  const {address, addressName, userId} = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the new address object
    const newAddress = {
      addressName,
      address,
    };

    // Push the new address into the user's address array
    user.address.push(newAddress);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Address added successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save address' });
  }
}

export const updateAddress = async (req, res) => {
  const {address, userId, newAddress, newName} = req.body;
  try {
    const user = await User.findOneAndUpdate(
      {'address._id':address._id},
      { $set: { 'address.$.address': newAddress, 'address.$.addressName': newName } },
      { new: true }   
    )
    return res.status(200).json({ message: 'Address added successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save address' });
  }
}