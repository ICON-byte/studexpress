'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

const tripSchema = z.object({
  departureLocation: z.string().min(2, 'Departure location is required'),
  destination: z.string().min(2, 'Destination is required'),
  vehicleType: z.string().min(2, 'Vehicle type is required'),
  loadAllowance: z.string().min(2, 'Load allowance is required'),
  tripDuration: z.string().min(1, 'Trip duration is required'),
  pricePerSeat: z.coerce.number().min(100, 'Price must be at least 100'),
  totalSeats: z.coerce.number().min(1, 'There must be at least 1 seat'),
  comfortStyle: z.string().min(2, 'Comfort style is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
});

// FIX: Separate input and output types to handle z.coerce correctly
type TripFormInput = z.input<typeof tripSchema>;
type TripFormOutput = z.output<typeof tripSchema>;

function AddTripForm() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  // FIX: Pass both Input and Output types to useForm
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<TripFormInput, any, TripFormOutput>({
    resolver: zodResolver(tripSchema),
  });

  // FIX: Use the Output type for the submit handler
  const onSubmit = async (data: TripFormOutput) => {
    try {
      await api.post('/trips', data);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add trip');
    }
  };

  // Success screen (Image 5 - slightly adapted for provider)
  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-8">Your Trip has been<br />added Successfully!</h1>
        <div className="bg-green-500 rounded-full p-4 mb-8">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsSuccess(false)} 
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            Add Another Trip
          </button>
          <button 
            onClick={() => router.push('/provider/my-trips')} 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View My Trips
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-3">Add Trips with Ease</h1>
      <p className="text-center text-gray-500 mb-10">
        Easily add and edit your trips with no stress under 2 minutes
      </p>

      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-6 bg-black rounded"></div>
          <h2 className="text-xl font-semibold">Add Trip</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-sm font-medium mb-2">Departure Location</label>
              <input 
                {...register('departureLocation')} 
                placeholder="Landmark University"
                className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.departureLocation && <p className="text-red-500 text-xs mt-1 pl-4">{errors.departureLocation.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Vehicle type</label>
              <input 
                {...register('vehicleType')} 
                placeholder="Car"
                className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.vehicleType && <p className="text-red-500 text-xs mt-1 pl-4">{errors.vehicleType.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Load Allowance</label>
              <input 
                {...register('loadAllowance')} 
                placeholder="1 Box and 1Bag"
                className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.loadAllowance && <p className="text-red-500 text-xs mt-1 pl-4">{errors.loadAllowance.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trip Duration</label>
              <input 
                {...register('tripDuration')} 
                placeholder="8 hours"
                className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.tripDuration && <p className="text-red-500 text-xs mt-1 pl-4">{errors.tripDuration.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Destination</label>
              <input 
                {...register('destination')} 
                placeholder="Lugbe Park View, Abuja"
                className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.destination && <p className="text-red-500 text-xs mt-1 pl-4">{errors.destination.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price Per Seat</label>
              <input 
                type="number"
                {...register('pricePerSeat')} 
                placeholder="#18000"
                className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.pricePerSeat && <p className="text-red-500 text-xs mt-1 pl-4">{errors.pricePerSeat.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total seat</label>
              <input 
                type="number"
                {...register('totalSeats')} 
                placeholder="4"
                className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.totalSeats && <p className="text-red-500 text-xs mt-1 pl-4">{errors.totalSeats.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Comfort Style</label>
              <input 
                {...register('comfortStyle')} 
                placeholder="AC & Refresh Certified"
                className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.comfortStyle && <p className="text-red-500 text-xs mt-1 pl-4">{errors.comfortStyle.message}</p>}
            </div>

            <div className="md:col-span-2 md:max-w-[50%]">
              <label className="block text-sm font-medium mb-2">Departure Date</label>
              <input 
                type="date"
                {...register('departureDate')} 
                className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
              />
              {errors.departureDate && <p className="text-red-500 text-xs mt-1 pl-4">{errors.departureDate.message}</p>}
            </div>

          </div>

          <div className="flex justify-center pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-16 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 font-medium"
            >
              {isSubmitting ? 'Adding Trip...' : 'Add Trip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddTripPage() {
  return (
    <ProtectedRoute allowedRole="PROVIDER">
      <AddTripForm />
    </ProtectedRoute>
  );
}