'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

interface Trip {
  _id: string;
  departureLocation: string;
  destination: string;
  departureDate: string;
  pricePerSeat: number;
  totalSeats: number;
  availableSeats: number;
}

function MyTrips() {
  const { data: trips, isLoading, isError } = useQuery<Trip[]>({
    queryKey: ['my-trips'],
    queryFn: async () => {
      const response = await api.get('/trips/my-trips');
      return response.data;
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading your trips...</div>;
  if (isError) return <div className="text-center py-20 text-red-500">Failed to load trips.</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">My Trips</h1>

      {trips && trips.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-500 mb-4">You haven't added any trips yet.</p>
          <Link href="/provider/add-trip" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Add Your First Trip
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips?.map((trip) => (
            <div key={trip._id} className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-1">
                {trip.departureLocation} - {trip.destination}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(trip.departureDate).toLocaleDateString('en-NG', { dateStyle: 'medium' })}
              </p>
              <div className="flex justify-between items-center border-t pt-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold">#{trip.pricePerSeat.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className={`font-semibold ${trip.availableSeats === 0 ? 'text-red-500' : 'text-green-600'}`}>
                    {trip.availableSeats}/{trip.totalSeats}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyTripsPage() {
  return (
    <ProtectedRoute allowedRole="PROVIDER">
      <MyTrips />
    </ProtectedRoute>
  );
}