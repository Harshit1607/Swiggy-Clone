import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;
const generateToken = (otp, email)=>{
  const token = jwt.sign({ otp, email }, SECRET_KEY, { expiresIn: '5m' });
  return token;
}

export default generateToken;