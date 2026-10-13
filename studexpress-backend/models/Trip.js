const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  departureLocation: { type: String, required: true },
  destination: { type: String, required: true },
  vehicleType: { type: String, required: true },
  loadAllowance: { type: String, required: true },
  tripDuration: { type: String, required: true },
  pricePerSeat: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  comfortStyle: { type: String, required: true },
  departureDate: { type: Date, required: true },
  status: { type: String, enum: ['ACTIVE', 'CANCELLED', 'COMPLETED'], default: 'ACTIVE' },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);