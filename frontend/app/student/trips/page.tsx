'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import api from '@/lib/axios';
import ProtectedRoute from '@/components/ProtectedRoute';
import TripCard, { TripData } from '@/components/TripCard';
import Pagination from '@/components/Pagination';

interface TripsResponse {
  trips: TripData[];
  page: number;
  pages: number;
  total: number;
}

function AvailableTrips() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery<TripsResponse>({
    queryKey: ['trips', currentPage],
    queryFn: async () => {
      const response = await api.get(`/trips?page=${currentPage}&limit=6`);
      return response.data;
    },
    placeholderData: keepPreviousData, // Prevents UI flicker when changing pages
  });

  const handleBookNow = (trip: TripData) => {
    // We will handle this in Day 6 with the booking modal
    console.log('Booking trip:', trip);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Available Trips to your<br />Destination
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Choose from verified providers, offering safe and affordable rides to your destination
          and book your seat in seconds.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm h-64 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-20 text-red-500">
          Failed to load trips. Please try again later.
        </div>
      )}

      {/* Empty State */}
      {data && data.trips.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-500">No trips available at the moment. Check back soon!</p>
        </div>
      )}

      {/* Trips Grid */}
      {data && data.trips.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} onBookNow={handleBookNow} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={data.pages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default function StudentTripsPage() {
  return (
    <ProtectedRoute allowedRole="STUDENT">
      <AvailableTrips />
    </ProtectedRoute>
  );
}