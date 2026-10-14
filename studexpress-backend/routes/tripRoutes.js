const express = require('express');
const router = express.Router();
const { createTrip, getTrips } = require('../controllers/tripController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public route to browse trips
router.get('/', getTrips);

// Protected route for Providers only to add a trip
router.post('/', protect, authorize('PROVIDER'), createTrip);

module.exports = router;