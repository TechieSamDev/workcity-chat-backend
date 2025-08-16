import { verifyJWT } from '../utils/common';
import { Socket } from 'socket.io';

type OnlineUsers = {
  [key: string]: { name: string; socketId: string; role: string };
};
const onlineUsers: OnlineUsers = {};

const chatSocket = (io, socket: Socket) => {
  console.log(socket.id, 'connected');
  console.log('online users', onlineUsers);

  socket.on('register', async (token) => {
    console.log(token);
    const user = await verifyJWT(token);
    if (!user) {
      socket.emit('unauthorized', { message: 'Invalid token' });
      return;
    }

    onlineUsers[user?._id.toString()] = {
      name: user?.name,
      socketId: socket.id,
      role: user?.role,
    };
    console.log('Online users:', onlineUsers);
    io.emit('online_users', onlineUsers);
  });

  socket.on(
    'private-message',
    async ({ recipientSocketId, token, message }) => {
      console.log(message, recipientSocketId, token);
      const user = await verifyJWT(token);

      console.log('recipient', recipientSocketId);

      if (!user) {
        socket.emit('user_offline', { message: 'User not available' });
        return;
      }

      io.to(recipientSocketId).emit('private-message', {
        sender: user._id.toString(),
        message,
        timestamp: new Date().toISOString(),
      });
    }
  );
};
export default chatSocket;
