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

// @desc    Get all active trips (with pagination)
// @route   GET /api/trips?page=1&limit=6
// @access  Public
const getTrips = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const total = await Trip.countDocuments({ status: 'ACTIVE' });
    
    const trips = await Trip.find({ status: 'ACTIVE' })
      .populate('providerId', 'firstName lastName email')
      .sort({ departureDate: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      trips,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get trips created by the logged-in provider
// @route   GET /api/trips/my-trips
// @access  Private (Provider only)
const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ providerId: req.user._id }).sort({ departureDate: -1 });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTrip, getTrips, getMyTrips };