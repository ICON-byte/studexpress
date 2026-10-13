const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  passengerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  serviceFee: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'FAILED'], default: 'PAID' }, // Defaulting to PAID for MVP
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);