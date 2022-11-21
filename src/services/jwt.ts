import jwt from 'jsonwebtoken';
import { User } from "../models/User";

const SECRET_KEY = 'H98DFADmdfadfe8987';

export function createToken(user: User, expiresIn: number) {
  const { id, email, rol } = user;
  const payload = { id, email, rol };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export function decodeToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}

// module.exports = {
//   createToken,
//   decodeToken,
// };
