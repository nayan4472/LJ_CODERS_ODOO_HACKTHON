require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fleetflow_auth').then(() => console.log('✅ Auth Service DB Connected'))
    .catch(err => console.error('❌ DB Connection Error:', err));

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'Auth service is running' }));

app.listen(PORT, () => {
    console.log(`🔐 Auth Service running on http://localhost:${PORT}`);
});
