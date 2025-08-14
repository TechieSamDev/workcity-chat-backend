import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();

import { ENVIRONMENT } from './config/environment';
import app from './app';
import connectDB from './config/db';
import { logger } from './utils/logger';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', () => {
  console.log('a user connected');
});

server.listen(ENVIRONMENT.APP.PORT, () => {
  logger.info(`Server is running on port ${ENVIRONMENT.APP.PORT}`);
  connectDB();
});
