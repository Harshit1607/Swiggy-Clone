import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (token) => {
  const decode = jwt.verify(token, SECRET_KEY);
  return decode
}

export default verifyToken;