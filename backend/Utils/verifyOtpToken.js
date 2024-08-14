import jwt from 'jsonwebtoken'
const SECRET_KEY = 'secret';

const verifyToken = (token) => {
  const decode = jwt.verify(token, SECRET_KEY);
  return decode
}

export default verifyToken;