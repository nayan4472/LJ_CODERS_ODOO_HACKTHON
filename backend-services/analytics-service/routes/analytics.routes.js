const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');

router.get('/maintenance', analyticsController.getMaintenanceLogs);
router.post('/maintenance', analyticsController.addMaintenanceLog);

router.get('/fuel', analyticsController.getFuelLogs);
router.post('/fuel', analyticsController.addFuelLog);

router.get('/roi', analyticsController.getROI);

module.exports = router;
