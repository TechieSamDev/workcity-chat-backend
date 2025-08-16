import { ENVIRONMENT } from '../config/environment';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const comparePassword = (
  passwordToCompare: string,
  passwordHash: string
) => {
  return bcrypt.compare(passwordToCompare, passwordHash);
};

export const verifyJWT = async (token: string) => {
  try {
    const decoded = jwt.verify(token, ENVIRONMENT.JWT.KEY) as { id: string };
    const user = await User.findById(decoded?.id as string).select('-password');
    return user;
  } catch {
    return null;
  }
};
