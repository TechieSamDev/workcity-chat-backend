import express, { Express } from 'express';
const app: Express = express();
import cors from 'cors';

import authRouter from './routes/authRoutes';
import { logger } from './utils/logger';
import { errorHandler } from './controllers/errorHandler';

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());

app.use((req, _res, next) => {
  logger.info(`====> [${req.method}] ${req.originalUrl}`);
  next();
});

app.use((req, res, next) => {
  res.on('finish', () => {
    logger.info(`<=== [${res.statusCode}] ${req.originalUrl}`);
  });
  next();
});

app.use('/auth', authRouter);

app.use(errorHandler);

export default app;
