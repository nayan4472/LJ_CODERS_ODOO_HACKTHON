const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true }, // in kg
    odometer: { type: Number, default: 0 },
    type: { type: String, enum: ['Truck', 'Van', 'Bike'], default: 'Truck' },
    status: { type: String, enum: ['Available', 'On Trip', 'In Shop', 'Off Duty'], default: 'Available' },
    isRetired: { type: Boolean, default: false },
    region: { type: String, default: 'Global' },
    companyId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
