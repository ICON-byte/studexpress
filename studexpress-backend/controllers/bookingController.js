const Booking = require('../models/Booking');
const Trip = require('../models/Trip');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (Student only)
const createBooking = async (req, res) => {
  try {
    const { tripId, passengerName, phoneNumber, emergencyContact } = req.body;

    // 1. Find the trip
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // 2. Check if seats are available
    if (trip.availableSeats <= 0) {
      return res.status(400).json({ message: 'No seats available for this trip' });
    }

    // 3. Calculate pricing (Adding a flat #150 service fee for the MVP)
    const ticketPrice = trip.pricePerSeat;
    const serviceFee = 150;
    const totalAmount = ticketPrice + serviceFee;

    // 4. Create the booking
    const booking = await Booking.create({
      tripId,
      studentId: req.user._id,
      passengerName,
      phoneNumber,
      emergencyContact,
      ticketPrice,
      serviceFee,
      totalAmount,
      paymentStatus: 'PAID' // Mocking successful payment for the 1-week MVP
    });

    // 5. Decrement the available seats on the trip
    trip.availableSeats -= 1;
    await trip.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private (Student only)
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ studentId: req.user._id })
      .populate('tripId', 'departureLocation destination departureDate'); // Get trip info

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createBooking, getMyBookings };