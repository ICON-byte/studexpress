'use client';

import { CarFront, Snowflake } from 'lucide-react';

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
  loadAllowance?: string;
  tripDuration?: string;
  providerId: {
    firstName: string;
    lastName: string;
  };
}

interface TripCardProps {
  trip: TripData;
  onBookNow: (trip: TripData) => void;
}

const getInitials = (firstName: string, lastName: string) =>
  `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();

const formatPrice = (price: number) => `#${Number(price).toLocaleString('en-NG')}`;

export default function TripCard({ trip, onBookNow }: TripCardProps) {
  const firstName = trip.providerId?.firstName || 'Travel';
  const lastName = trip.providerId?.lastName || 'Provider';
  const providerName = `${firstName} ${lastName}`;
  const initials = getInitials(firstName, lastName);
  const departure = new Date(trip.departureDate);
  const departureTime = Number.isNaN(departure.getTime())
    ? 'Time to be confirmed'
    : departure.toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit', hour12: true });
  const soldOut = trip.availableSeats < 1;

  return (
    <article className="flex min-h-[266px] flex-col rounded-2xl border border-[#e4e4e4] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-6">
      <div className="flex items-center gap-4">
        <div className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-xl bg-[#4b9ff7] text-2xl font-bold text-white">
          {initials}
        </div>
        <div className="min-w-0">
          <h2 className="break-words text-base font-semibold text-[#29282b]">{providerName}</h2>
          {trip.comfortStyle && (
            <div className="mt-2 flex items-start gap-1.5 text-xs font-medium text-[#3b9af5]">
              <Snowflake size={15} className="mt-0.5 shrink-0" />
              <span className="min-w-0 break-words">{trip.comfortStyle}</span>
            </div>
          )}
        </div>
      </div>

      <h3 className="mt-5 break-words text-base font-semibold leading-6 text-[#29282b]">
        {trip.departureLocation} <span className="px-1">-</span> {trip.destination}
      </h3>

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="min-w-0 break-words text-sm text-[#77767a]">Departure: {departureTime}</p>
        <p className="shrink-0 text-xl font-bold text-[#1765ad]">{formatPrice(trip.pricePerSeat)}</p>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
        <div className="space-y-2">
          <p className={`text-sm font-medium ${soldOut ? 'text-slate-500' : trip.availableSeats <= 3 ? 'text-red-500' : 'text-green-600'}`}>
            {soldOut ? 'Fully booked' : `${trip.availableSeats} Seat${trip.availableSeats === 1 ? '' : 's'} Left`}
          </p>
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#c8e4ff] px-3 py-1 text-xs text-slate-700">
            <CarFront size={15} className="shrink-0" /> <span className="break-words">{trip.vehicleType}</span>
          </span>
        </div>
        <button
          onClick={() => onBookNow(trip)}
          disabled={soldOut}
          className="shrink-0 rounded-md bg-[#105fae] px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {soldOut ? 'Sold Out' : 'Book Now'}
        </button>
      </div>
    </article>
  );
}
