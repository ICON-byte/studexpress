'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const isProviderPage = pathname.startsWith('/provider');
  const tabs = [
    { label: 'Transport Provider', href: '/provider/add-trip', active: isProviderPage },
    { label: 'Student', href: '/student/trips', active: pathname.startsWith('/student') },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white">
      <div className="relative mx-auto flex min-h-[88px] max-w-7xl items-center justify-center px-4 sm:min-h-[96px]">
        <div className="flex h-full items-stretch gap-7 sm:gap-10">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              aria-current={tab.active ? 'page' : undefined}
              className={`relative flex items-center px-1 text-sm font-medium transition-colors sm:text-base ${tab.active ? 'text-slate-950' : 'text-slate-600 hover:text-blue-700'}`}
            >
              {tab.label}
              {tab.active && <span className="absolute inset-x-0 bottom-4 h-0.5 rounded-full bg-slate-950 sm:bottom-5" />}
            </Link>
          ))}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-8">
          {user ? (
            <button onClick={logout} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Log out" title="Log out">
              <LogOut size={18} />
            </button>
          ) : (
            <Link href="/login" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 sm:inline-flex">Log in</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
