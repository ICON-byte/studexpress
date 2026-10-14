'use client';

interface BookingSuccessProps {
  onBack: () => void;
}

export default function BookingSuccess({ onBack }: BookingSuccessProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="mb-8 text-4xl font-medium leading-tight tracking-tight text-black sm:text-[2.6rem]">
        Your seat has been
        <br />
        booked successfully!
      </h1>
      <div className="mb-9 rounded-full bg-[#45d17a] p-4">
        <svg
          className="h-12 w-12 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <button
        onClick={onBack}
        className="rounded-lg bg-blue-700 px-8 py-3 font-medium text-white transition hover:bg-blue-800"
      >
        Back to Trips
      </button>
    </div>
  );
}
