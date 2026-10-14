const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const mongoose = require('mongoose');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (Student only)
const createBooking = async (req, res) => {
  try {
    const { tripId, passengerName, phoneNumber, emergencyContact } = req.body;

    // 1. Validate required fields
    if (!tripId || !passengerName || !phoneNumber || !emergencyContact) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Validate tripId is a real ObjectId (prevents CastError from
    //    findOneAndUpdate when someone passes a bogus id)
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: 'Invalid trip ID' });
    }

    // 3. Atomically decrement the seat count — only succeeds if seats are
    //    available. Prevents two students booking the "last seat" at once.
    const trip = await Trip.findOneAndUpdate(
      { _id: tripId, availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } },
      { new: true }
    );

    if (!trip) {
      // Could mean "trip doesn't exist" OR "trip is sold out" — a single
      // findOneAndUpdate can't tell us which. Do a quick existence check
      // to send a more accurate error.
      const exists = await Trip.exists({ _id: tripId });
      if (!exists) {
        return res.status(404).json({ message: 'Trip not found' });
      }
      return res.status(400).json({ message: 'No seats available for this trip' });
    }

    // 4. Calculate pricing
    const ticketPrice = trip.pricePerSeat;
    const serviceFee = 150;
    const totalAmount = ticketPrice + serviceFee;

    // 5. Create the booking. If this fails, roll back the seat decrement so
    //    the seat isn't permanently lost.
    let booking;
    try {
      booking = await Booking.create({
        tripId,
        studentId: req.user._id,
        passengerName,
        phoneNumber,
        emergencyContact,
        ticketPrice,
        serviceFee,
        totalAmount,
        paymentStatus: 'PAID', // Mocking successful payment for the 1-week MVP
      });
    } catch (bookingError) {
      await Trip.findByIdAndUpdate(tripId, { $inc: { availableSeats: 1 } });
      throw bookingError;
    }

    res.status(201).json(booking);
  } catch (error) {
    console.error('createBooking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private (Student only)
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ studentId: req.user._id })
      .populate('tripId', 'departureLocation destination departureDate pricePerSeat')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('getMyBookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createBooking, getMyBookings };