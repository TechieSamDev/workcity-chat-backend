import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { ENVIRONMENT } from './environment';

const connectDB = async () =>
  await mongoose
    .connect(ENVIRONMENT.DB.URL as string)
    .then(() => {
      logger.info('Connected to MongoDB successfully');
    })
    .catch((error) => {
      logger.error('Failed to connect to MongoDB', error);
    });

export default connectDB;
