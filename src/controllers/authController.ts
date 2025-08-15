import { ENVIRONMENT } from '../config/environment';
import User from '../models/userModel';
import AppError from '../utils/appError';

import jwt from 'jsonwebtoken';
import catchAsync from '../middlewares/catchAsync';
import { comparePassword } from '../utils/common';

const signToken = (id: string) => {
  return jwt.sign({ id }, ENVIRONMENT.JWT.KEY, {
    expiresIn: '5h',
  });
};

export const signup = catchAsync(async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password)
    throw new AppError('Incomplete signup data', 400);

  await User.create({
    email,
    name,
    password,
    role: 'customer',
  });

  res.status(201).json({
    status: 'success',
    message: 'Signup successful',
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Email and password are required', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await comparePassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  const accessToken = signToken(user._id.toString());
  res.cookie('access-token', accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: false,
    expires: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours
  });

  user.password = undefined;
  res.status(200).json({
    message: 'Login Successful',
    status: 'success',
    user,
    token: accessToken,
  });
});

export const getSession = catchAsync(async (req, res) => {
  let token;
  
  if (req.headers.authorization)
    token = req.headers.authorization.split(' ')[1];
  else token = req.headers.cookie;

  if (!token) throw new AppError('Invalid token', 401);

  const payload = jwt.verify(token, ENVIRONMENT.JWT.KEY) as { id: string };

  const user = await User.findById(payload?.id).select('-password');

  if (!user) throw new AppError('Error', 401);

  res.status(200).json({
    message: 'Session retrieved successfully',
    data: user,
    status: 'success',
  });
});
