import jwt from 'jsonwebtoken'
const SECRET_KEY = 'secret';

const generateToken = (otp, email)=>{
  const token = jwt.sign({ otp, email }, SECRET_KEY, { expiresIn: '5m' });
  return token;
}

export default generateToken;