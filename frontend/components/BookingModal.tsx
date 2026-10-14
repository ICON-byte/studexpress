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

  const departure = new Date(trip.departureDate);
  const departureLabel = Number.isNaN(departure.getTime())
    ? 'Departure time to be confirmed'
    : departure.toLocaleString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true });
  const currency = (amount: number) => `₦${Number(amount).toLocaleString('en-NG')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="booking-title" className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-[1.4rem] bg-white shadow-2xl shadow-black/25">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 pt-6 sm:px-11 sm:pt-8">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded"></div>
            <h2 id="booking-title" className="text-2xl font-bold tracking-tight text-[#29282b]">Book Your Seat</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking"
            className="grid h-9 w-9 place-items-center rounded-full bg-black text-white transition hover:bg-slate-700"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-6 px-6 pb-7 sm:space-y-7 sm:px-11 sm:pb-9">
          {/* Trip Summary Box */}
          <div className="rounded-xl bg-[#e8f3ff] p-5 sm:p-6">
            <h3 className="mb-3 text-lg font-medium text-[#29282b]">Trip Summary</h3>
            <p className="text-base text-gray-700">
              {trip.departureLocation} - {trip.destination}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {departureLabel}{trip.tripDuration ? ` · ${trip.tripDuration}` : ''}
            </p>
            {trip.loadAllowance && <p className="mt-2 text-sm text-gray-600">Load Allowance: {trip.loadAllowance}</p>}
            <div className="flex justify-between items-end mt-3">
              <p className="text-lg font-semibold text-blue-700">
                {currency(trip.pricePerSeat)}
              </p>
              <span className="text-xs text-red-500">Cancellation Policy</span>
            </div>
          </div>

          {/* Passenger Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Passenger Details</label>
              <input
                {...register('passengerName')}
                placeholder="Temmy Adetola"
                className="w-full rounded-lg border border-[#cfcfcf] p-3.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                className="w-full rounded-lg border border-[#cfcfcf] p-3.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                className="w-full rounded-lg border border-[#cfcfcf] p-3.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {errors.emergencyContact && (
                <p className="text-red-500 text-xs mt-1">{errors.emergencyContact.message}</p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 rounded-xl bg-[#e8f3ff] p-5 sm:p-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Ticket Price:</span>
                <span className="font-medium">{currency(ticketPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Service Fee:</span>
                <span className="font-medium">{currency(SERVICE_FEE)}</span>
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-blue-700">{currency(totalAmount)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-700 py-3.5 text-lg font-medium text-white transition hover:bg-blue-800 disabled:bg-blue-300"
            >
              {isSubmitting ? 'Processing...' : 'Pay'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
