const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');

router.get('/', tripController.getTrips);
router.post('/', tripController.createTrip);
router.put('/:id', tripController.updateTripStatus);

module.exports = router;
