require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fleetflow_analytics').then(() => console.log('✅ Analytics Service DB Connected'))
    .catch(err => console.error('❌ DB Connection Error:', err));

app.get('/health', (req, res) => res.status(200).json({ status: 'Analytics service is running' }));

// Mock Odoo Sync Endpoint Template
app.post('/api/v1/analytics/sync-odoo', (req, res) => {
    // In a real hackathon project, this would use XML-RPC to sync fleet cost/ROI data to Odoo
    console.log('🔄 Syncing financial data to Odoo ERP...');
    res.status(200).json({ message: 'Synchronized with Odoo successfully', syncedRecords: 5 });
});

app.listen(PORT, () => {
    console.log(`📊 Analytics Service running on http://localhost:${PORT}`);
});
