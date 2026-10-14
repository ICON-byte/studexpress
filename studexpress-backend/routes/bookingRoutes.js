const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Only logged-in students can create a booking or view their bookings
router.post('/', protect, authorize('STUDENT'), createBooking);
router.get('/mybookings', protect, authorize('STUDENT'), getMyBookings);

module.exports = router;