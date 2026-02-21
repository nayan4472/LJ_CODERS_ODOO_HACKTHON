const Trip = require('../models/Trip');
// Note: In a real microservices architecture, we'd use RabbitMQ or gRPC to talk to Fleet Service.
// For this hackathon, we'll assume Trip Service can access the same MongoDB or use an axios call.
// Since we are on same machine, I'll use direct mongoose updates if possible or mock the cross-service call.
// Actually, I'll just write the controller to update statuses.

exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ companyId: req.query.companyId });
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTrip = async (req, res) => {
    try {
        const { vehicleId, driverId, cargoWeight, companyId } = req.body;

        // Mock Validation: CargoWeight > MaxCapacity check
        // In real app, we would fetch vehicle from Fleet Service
        // For now, assume a mock check or provided vehicle capacity in request
        if (req.body.maxCapacity && cargoWeight > req.body.maxCapacity) {
            return res.status(400).json({ error: 'Cargo weight exceeds vehicle capacity' });
        }

        const trip = new Trip(req.body);
        await trip.save();

        // Trigger Status Update to Fleet Service (Mocked as internal logic for this demo)
        // vehicle.status = 'On Trip'; driver.status = 'On Trip';

        res.status(201).json(trip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTripStatus = async (req, res) => {
    try {
        const { status, finalOdometer, fuelLog } = req.body;
        const trip = await Trip.findByIdAndUpdate(req.params.id, { status, finalOdometer, fuelLog }, { new: true });

        if (status === 'Completed') {
            // Update Vehicle Odometer and Status -> 'Available'
            // Update Driver Status -> 'Available'
        }

        res.status(200).json(trip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
