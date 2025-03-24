const socketIO = require('socket.io');

let io;

const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: "*", // Allow all origins (update for production)
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Join specific room for real-time updates
        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`Client ${socket.id} joined room: ${room}`);
        });

        // Leave room
        socket.on('leaveRoom', (room) => {
            socket.leave(room);
            console.log(`Client ${socket.id} left room: ${room}`);
        });

        // Listen for client-specific events (if needed)
        socket.on('customEvent', (data) => {
            console.log(`Received custom event from ${socket.id}:`, data);
        });

        // Handle client disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

// Emit update to specific room or globally
const emitUpdate = (event, data, room = null) => {
    if (io) {
        if (room) {
            io.to(room).emit(event, data); // Emit to specific room
        } else {
            io.emit(event, data); // Emit globally
        }
    }
};

module.exports = {
    initializeSocket,
    emitUpdate,
};
