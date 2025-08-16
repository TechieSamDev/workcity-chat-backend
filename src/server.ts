import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();

import { ENVIRONMENT } from './config/environment';
import app from './app';
import connectDB from './config/db';
import { logger } from './utils/logger';
import { Server } from 'socket.io';
import chatSocket from './socketio/chat.socketio';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'https://workcity-chat-frontend-techiesam.vercel.app',
    ], 
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => chatSocket(io, socket));

server.listen(ENVIRONMENT.APP.PORT, () => {
  logger.info(`Server is running on port ${ENVIRONMENT.APP.PORT}`);
  connectDB();
});
