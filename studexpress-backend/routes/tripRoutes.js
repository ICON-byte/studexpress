const express = require('express');
const router = express.Router();
const { createTrip, getTrips, getMyTrips } = require('../controllers/tripController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public route to browse trips
router.get('/', getTrips);

router.get('/my-trips', protect, authorize('PROVIDER'), getMyTrips);

// Protected route for Providers only to add a trip
router.post('/', protect, authorize('PROVIDER'), createTrip);

module.exports = router;