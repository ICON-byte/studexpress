'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'STUDENT' | 'PROVIDER';
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== allowedRole) {
        // Redirect to their correct dashboard if wrong role
        router.push(user.role === 'PROVIDER' ? '/provider/add-trip' : '/student/trips');
      }
    }
  }, [user, isLoading, allowedRole, router]);

  if (isLoading || !user || user.role !== allowedRole) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}