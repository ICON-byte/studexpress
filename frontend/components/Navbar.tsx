'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-blue-600">
          StudExpress
        </Link>
        <div className="flex gap-4 items-center text-sm">
          <Link href="/trips" className="hover:text-blue-600">Trips</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <button onClick={logout} className="text-red-500 hover:text-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-600">Login</Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}