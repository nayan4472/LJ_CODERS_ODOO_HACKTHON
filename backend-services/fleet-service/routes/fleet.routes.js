const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/fleet.controller');

// Vehicle Routes
router.get('/vehicles', fleetController.getVehicles);
router.post('/vehicles', fleetController.addVehicle);
router.put('/vehicles/:id', fleetController.updateVehicle);
router.delete('/vehicles/:id', fleetController.deleteVehicle);

// Driver Routes
router.get('/drivers', fleetController.getDrivers);
router.post('/drivers', fleetController.addDriver);
router.put('/drivers/:id', fleetController.updateDriver);

module.exports = router;
