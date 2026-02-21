require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Define routes for proxying to microservices
const services = {
    '/api/v1/auth': 'http://localhost:5001',
    '/api/v1/vehicles': 'http://localhost:5002',
    '/api/v1/trips': 'http://localhost:5003',
    '/api/v1/analytics': 'http://localhost:5005',
};

// Apply proxy middleware
Object.entries(services).forEach(([route, target]) => {
    app.use(route, createProxyMiddleware({
        target,
        changeOrigin: true,
        logLevel: 'debug'
    }));
});

app.get('/health', (req, res) => res.status(200).json({ status: 'Gateway is running' }));

app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});
