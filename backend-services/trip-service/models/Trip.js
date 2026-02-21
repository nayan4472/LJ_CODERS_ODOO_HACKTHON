const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    cargoWeight: { type: Number, required: true }, // in kg
    source: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, enum: ['Draft', 'Dispatched', 'Completed', 'Cancelled'], default: 'Draft' },
    finalOdometer: { type: Number },
    fuelLog: {
        liters: { type: Number },
        cost: { type: Number }
    },
    companyId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);
