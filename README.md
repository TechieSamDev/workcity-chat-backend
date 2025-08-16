# Express Chat Backend API

A Node.js backend application built with Express and Socket.io, providing authentication and real-time chat functionality.

## Tech Stack

- **Express.js** - Web framework for Node.js
- **Socket.io** - Real-time bidirectional event-based communication
- **TypeScript** - Type safety and modern JavaScript features
- **MongoDB/Database** - Data persistence
- **JWT** - Authentication tokens

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create environment file

```bash
cp .env.example .env
```

Configure your environment variables in `.env`:

```env
JWT_SECRET=<jwt_secret>
DB_URL=<mongodb_connection_string>
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:5000` by default (no env provided)

## Project Structure

```
src/
├── config/              # Configuration files
│   ├── db.js           # Database connection setup
│   └── environment.js  # Environment variables loader (centralized process.env)
├── controllers/         # Route handlers and business logic
│   ├── authController.js    # Authentication logic (login, register, etc.)
│   ├── chatController.js    # Chat-related API endpoints
│   └── errorHandler.js      # Global error handling middleware
├── middlewares/         # Custom middleware functions
│   └── catchAsync.js   # Async error handling wrapper
├── models/             # Database models/schemas
│   └── userModel.ts    # User data model
├── routes/             # API route definitions
│   ├── authRoutes.js   # Authentication endpoints
│   └── socketio.js     # Socket.io event handlers
└── utils/              # Utility functions and helpers
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
JWT_SECRET=<jwt_secret>
DB_URL=<mongodb_connection_string>
```

Replace the placeholders with your actual values:

- `<jwt_secret>` - A secure random string for JWT token signing
- `<mongodb_connection_string>` - Your MongoDB connection URL

**Configuration Features:**

- Centralized environment loading through `config/environment.js`
- Costly `process.env` calls are optimized and cached
- Database connection managed in `config/db.js`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## API Endpoints

### Authentication Routes

```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
POST /api/auth/logout      # User logout
GET  /api/auth/me          # Get current user
```

### Chat Routes

```
GET  /api/chat/messages    # Get chat messages
POST /api/chat/messages    # Send message
```

## Socket.io Events

### Client to Server

- `register` - Register user with JWT token for online status
- `private-message` - Send private message to specific user

### Server to Client

- `unauthorized` - Invalid token response
- `online_users` - Updated list of online users
- `private-message` - Receive private message from another user
- `user_offline` - User not available for messaging

### Event Details

#### `register`

```javascript
socket.emit('register', jwt_token);
```

Registers the user with their JWT token to track online status and enable messaging.

#### `private-message`

```javascript
socket.emit('private-message', {
  recipientSocketId: 'socket_id',
  token: 'jwt_token',
  message: 'message_content',
});
```

Sends a private message to a specific user using their socket ID.

#### `online_users`

```javascript
socket.on('online_users', (users) => {
  // users object contains: { userId: { name, socketId, role } }
});
```

Receives updated list of all online users with their details.

#### `private-message` (received)

```javascript
socket.on('private-message', (data) => {
  // data: { sender: userId, message: content, timestamp: ISO_string }
});
```

Receives a private message from another user.

## Features

- **Authentication** - JWT-based user authentication
- **Real-time Chat** - Live messaging with Socket.io
- **Error Handling** - Centralized error management
- **Type Safety** - TypeScript support for models
- **Async Handling** - Proper async/await error catching
- **Database Integration** - MongoDB connection and models
- **CORS Support** - Cross-origin resource sharing
- **Environment Management** - Optimized environment variable handling

## Architecture

### Error Handling

- Global error handler in `controllers/errorHandler.js`
- Async wrapper middleware `catchAsync` for route handlers
- Consistent error response format

### Database

- Connection setup in `config/db.js`
- TypeScript models for type safety
- User model with authentication features

### Socket.io Integration

- Real-time event handling in `routes/socketio.js`
- Room-based chat functionality
- Connection management and user presence

## Development

The project follows a modular structure with clear separation of concerns:

- **Config**: Environment and database setup
- **Controllers**: Business logic and request handling
- **Middlewares**: Reusable middleware functions
- **Models**: Data structures and database schemas
- **Routes**: API endpoints and Socket.io events
- **Utils**: Helper functions and utilities
