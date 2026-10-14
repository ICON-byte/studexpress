'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { TripData } from './TripCard';

const bookingSchema = z.object({
  passengerName: z.string().min(2, 'Passenger name is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  emergencyContact: z.string().min(10, 'Emergency contact is required'),
});

type BookingForm = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  trip: TripData;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SERVICE_FEE = 150;

export default function BookingModal({ trip, isOpen, onClose, onSuccess }: BookingModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  if (!isOpen) return null;

  const ticketPrice = trip.pricePerSeat;
  const totalAmount = ticketPrice + SERVICE_FEE;

  const onSubmit = async (data: BookingForm) => {
    try {
      await api.post('/bookings', {
        tripId: trip._id,
        ...data,
      });
      reset();
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  const departureTime = new Date(trip.departureDate).toLocaleString('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded"></div>
            <h2 className="text-xl font-bold">Book Your Seat</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Trip Summary Box */}
          <div className="bg-blue-50 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Trip Summary</h3>
            <p className="text-sm text-gray-700">
              {trip.departureLocation} - {trip.destination}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Today, {departureTime} . {trip.comfortStyle.split(' ')[0]}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Load Allowance: {trip.totalSeats} Seats Total
            </p>
            <div className="flex justify-between items-end mt-3">
              <p className="text-blue-600 font-bold text-lg">
                #{trip.pricePerSeat.toLocaleString()}
              </p>
              <button className="text-red-500 text-xs underline">Cancellation Policy</button>
            </div>
          </div>

          {/* Passenger Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Passenger Details</label>
              <input
                {...register('passengerName')}
                placeholder="Temmy Adetola"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.passengerName && (
                <p className="text-red-500 text-xs mt-1">{errors.passengerName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                {...register('phoneNumber')}
                placeholder="+234 703 443 4328"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Emergency Contact</label>
              <input
                {...register('emergencyContact')}
                placeholder="+234 703 312 2239"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.emergencyContact && (
                <p className="text-red-500 text-xs mt-1">{errors.emergencyContact.message}</p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-blue-50 rounded-2xl p-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Ticket Price:</span>
                <span className="font-medium">#{ticketPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Service Fee:</span>
                <span className="font-medium">#{SERVICE_FEE.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-blue-600">#{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isSubmitting ? 'Processing...' : 'Pay'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}