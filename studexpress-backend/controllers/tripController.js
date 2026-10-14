const Trip = require('../models/Trip');

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private (Provider only)
const createTrip = async (req, res) => {
  try {
    const {
      departureLocation, destination, vehicleType, loadAllowance,
      tripDuration, pricePerSeat, totalSeats, comfortStyle, departureDate
    } = req.body;

    const trip = await Trip.create({
      providerId: req.user._id, // Comes from the protect middleware
      departureLocation,
      destination,
      vehicleType,
      loadAllowance,
      tripDuration,
      pricePerSeat,
      totalSeats,
      availableSeats: totalSeats, // Initially, all seats are available
      comfortStyle,
      departureDate
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all active trips
// @route   GET /api/trips
// @access  Public (or Private for logged-in students)
const getTrips = async (req, res) => {
  try {
    // For MVP, fetch all active trips. We will add pagination later if time permits.
    const trips = await Trip.find({ status: 'ACTIVE' })
      .populate('providerId', 'firstName lastName email') // Get provider details
      .sort({ departureDate: 1 }); // Sort by soonest departure

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTrip, getTrips };