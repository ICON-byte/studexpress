'use client';

import { Star, Snowflake, Car } from 'lucide-react';

export interface TripData {
  _id: string;
  departureLocation: string;
  destination: string;
  vehicleType: string;
  pricePerSeat: number;
  availableSeats: number;
  totalSeats: number;
  departureDate: string;
  comfortStyle: string;
  providerId: {
    firstName: string;
    lastName: string;
  };
}

interface TripCardProps {
  trip: TripData;
  onBookNow: (trip: TripData) => void;
}

// Helper: Get initials for provider logo (e.g., "God's Time" -> "GT")
const getInitials = (firstName: string, lastName: string) => {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
};

export default function TripCard({ trip, onBookNow }: TripCardProps) {
  const providerName = `${trip.providerId?.firstName || 'Provider'} ${trip.providerId?.lastName || ''}`.trim();
  const initials = getInitials(trip.providerId?.firstName, trip.providerId?.lastName);
  const departureTime = new Date(trip.departureDate).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col">
      {/* Header: Logo + Provider Info */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-14 h-14 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">
          {initials}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">{providerName}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span>4.8 (234 reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
            <Snowflake size={12} />
            <span>{trip.comfortStyle}</span>
          </div>
        </div>
      </div>

      {/* Route */}
      <h4 className="font-semibold text-gray-900 mb-2">
        {trip.departureLocation} - {trip.destination}
      </h4>

      {/* Details Row */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-gray-500">Departure: {departureTime}</p>
        <p className="text-blue-600 font-bold text-lg">#{trip.pricePerSeat.toLocaleString()}</p>
      </div>

      {/* Footer: Seats + Vehicle + Book Button */}
      <div className="flex justify-between items-end mt-auto pt-3 border-t border-gray-100">
        <div className="space-y-2">
          <p className={`text-xs font-medium ${trip.availableSeats <= 3 ? 'text-red-500' : 'text-green-600'}`}>
            {trip.availableSeats} Seats Left
          </p>
          <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            <Car size={12} />
            <span>{trip.vehicleType}</span>
          </div>
        </div>
        <button
          onClick={() => onBookNow(trip)}
          disabled={trip.availableSeats === 0}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {trip.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
        </button>
      </div>
    </div>
  );
}