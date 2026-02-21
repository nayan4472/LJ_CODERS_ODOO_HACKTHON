require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
});

const PORT = process.env.PORT || 5004;

app.use(cors());
app.get('/health', (req, res) => res.status(200).json({ status: 'Real-time service is running' }));

io.on('connection', (socket) => {
    console.log(`⚡ Client connected: ${socket.id}`);

    socket.on('join_company_room', (companyId) => {
        socket.join(companyId);
        console.log(`User ${socket.id} joined room ${companyId}`);
    });

    socket.on('vehicle_location_update', (data) => {
        // Broadcast location update to the specific company room
        // Payload: { companyId, vehicleId, lat, lng, speed }
        io.to(data.companyId).emit('map_update', data);
        console.log(`📡 Broadcasted location for ${data.vehicleId}`);
    });

    socket.on('disconnect', () => {
        console.log(`🔴 Client disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`🌐 Real-time Service running on http://localhost:${PORT}`);
});
