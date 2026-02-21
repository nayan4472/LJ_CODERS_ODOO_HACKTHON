require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002;

const fleetRoutes = require('./routes/fleet.routes');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fleetflow_fleet').then(() => console.log('✅ Fleet Service DB Connected'))
    .catch(err => console.error('❌ DB Connection Error:', err));

app.use('/', fleetRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'Fleet service is running' }));

app.listen(PORT, () => {
    console.log(`🚚 Fleet Service running on http://localhost:${PORT}`);
});
