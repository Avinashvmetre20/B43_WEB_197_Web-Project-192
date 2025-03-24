//server.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const redis = require('redis');
const socketIo = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');
const { setupRoutes } = require('./routes');
const { initializeSocket } = require('./utils/socket'); // Corrected the function name

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 8080;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const MONGODB_URI = process.env.MONGODB || 'mongodb://localhost:27017/CWP';

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve frontend files from the public folder
app.use(express.static(__dirname + '/public'));


// Redis Client
const redisClient = redis.createClient({ url: REDIS_URL });
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err) => console.error('Redis connection error:', err));

// MongoDB Connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Set up routes
setupRoutes(app);

// Set up Socket.io for real-time updates
initializeSocket(server); // Fixed the function call

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
