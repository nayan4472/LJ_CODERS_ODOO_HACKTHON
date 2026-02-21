const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    licenseType: { type: String, enum: ['Truck', 'Van', 'Bike'], required: true },
    licenseExpiry: { type: Date, required: true },
    status: { type: String, enum: ['Available', 'On Trip', 'Off Duty', 'Suspended'], default: 'Available' },
    safetyScore: { type: Number, default: 100 },
    completionRate: { type: Number, default: 100 },
    companyId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Driver', DriverSchema);
