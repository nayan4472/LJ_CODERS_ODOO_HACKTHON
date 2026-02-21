const mongoose = require('mongoose');

const MaintenanceLogSchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    serviceType: { type: String, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
    companyId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('MaintenanceLog', MaintenanceLogSchema);
