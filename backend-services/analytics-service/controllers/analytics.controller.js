const MaintenanceLog = require('../models/MaintenanceLog');
const FuelLog = require('../models/FuelLog');

// Maintenance Controllers
exports.getMaintenanceLogs = async (req, res) => {
    try {
        const logs = await MaintenanceLog.find({ companyId: req.query.companyId });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addMaintenanceLog = async (req, res) => {
    try {
        const log = new MaintenanceLog(req.body);
        await log.save();

        // Trigger Status Update to Fleet Service -> 'In Shop'

        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fuel Controllers
exports.getFuelLogs = async (req, res) => {
    try {
        const logs = await FuelLog.find({ companyId: req.query.companyId });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addFuelLog = async (req, res) => {
    try {
        const log = new FuelLog(req.body);
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Advanced Metrics
exports.getROI = async (req, res) => {
    try {
        // Mock Implementation of ROI Calculation
        // Vehicle ROI = (Revenue - (Maintenance + Fuel)) / Acquisition Cost
        // For hackathon, return some dynamic-looking data
        const stats = [
            { vehicleId: 'V001', roi: 12.5, efficiency: 8.2 },
            { vehicleId: 'V002', roi: 8.4, efficiency: 6.5 }
        ];
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
