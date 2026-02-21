const mongoose = require('mongoose');

const FuelLogSchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId },
    liters: { type: Number, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    companyId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FuelLog', FuelLogSchema);
