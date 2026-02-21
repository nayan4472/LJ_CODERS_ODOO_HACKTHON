require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5003;

const tripRoutes = require('./routes/trip.routes');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fleetflow_trip').then(() => console.log('✅ Trip Service DB Connected'))
    .catch(err => console.error('❌ DB Connection Error:', err));

app.use('/', tripRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'Trip service is running' }));

app.listen(PORT, () => {
    console.log(`📦 Trip Service running on http://localhost:${PORT}`);
});
