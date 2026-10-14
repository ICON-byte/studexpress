'use client';

interface BookingSuccessProps {
  onBack: () => void;
}

export default function BookingSuccess({ onBack }: BookingSuccessProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
        Your Trip has been
        <br />
        added Successfully!
      </h1>
      <div className="bg-green-500 rounded-full p-6 mb-12">
        <svg
          className="w-16 h-16 text-white"
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
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
      >
        Back to Trips
      </button>
    </div>
  );
}