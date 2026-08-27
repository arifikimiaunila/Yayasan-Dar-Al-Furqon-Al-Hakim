import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Adjust import path as needed
import NavbarGuest from './NavbarGuest';
import NavbarAdmin from './NavbarAdmin';

export default function Navigasi() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { roles } = useAuth();

  const systemDropdownRef = useRef<HTMLDivElement>(null);
  const yayasanDropdownRef = useRef<HTMLDivElement>(null);

  const isSuperAdmin = roles?.includes('superadministration');

  const handleClickOutside = (event: MouseEvent) => {
    const isClickInSystem =
      systemDropdownRef.current?.contains(event.target as Node);
    const isClickInYayasan =
      yayasanDropdownRef.current?.contains(event.target as Node);

    if (!isClickInSystem && !isClickInYayasan) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  if (isSuperAdmin) {
    return (
      <div className="flex items-center">
        {/* 1. System Configuration Menu */}
        <div className="relative mr-4" ref={systemDropdownRef}>
          <button
            onClick={() =>
              setActiveMenu(activeMenu === 'system' ? null : 'system')
            }
            className="flex items-center space-x-1 text-red-700 font-bold hover:text-red-900 focus:outline-none transition-colors"
          >
            <span>🛠️ Sistem</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                activeMenu === 'system' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {activeMenu === 'system' && (
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  User Management
                </div>
                <a
                  href="/users"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                >
                  👥 Daftar Pengguna
                </a>

                <div className="border-t border-gray-100 my-1"></div>
                <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Laratrust Roles
                </div>
                <a
                  href="/roles"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                >
                  🛡️ Kelola Roles
                </a>
                <a
                  href="/permissions"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                >
                  🔑 Permissions
                </a>
                <a
                  href="/role-assignments"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                >
                  🔗 Assignment
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 2. Data Yayasan Menu */}
        <div className="relative mr-4" ref={yayasanDropdownRef}>
          <button
            onClick={() =>
              setActiveMenu(activeMenu === 'yayasan' ? null : 'yayasan')
            }
            className="flex items-center space-x-1 text-purple-700 font-bold hover:text-purple-900 focus:outline-none transition-colors"
          >
            <span>🏢 Yayasan</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                activeMenu === 'yayasan' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {activeMenu === 'yayasan' && (
            <div className="absolute left-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <a
                  href="/yayasan/create"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                >
                  ➕ Input Baru
                </a>
                <a
                  href="/yayasan/edit"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                >
                  ✏️ Konfigurasi
                </a>
                <a
                  href="/yayasan/debug-cookies"
                  className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 italic text-xs transition-colors"
                >
                  🍪 Debug Cookies
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        {/* Navbar Gabungan untuk Superadmin */}
        <NavbarAdmin />
        <div className="h-6 w-px bg-gray-300 mx-4"></div>

        {/* 3. Profile & API (Right) */}
        <div className="ml-auto flex items-center space-x-3 pl-4 border-l border-gray-200">
          <a
            href="/profile"
            className="text-xs text-gray-500 hover:text-blue-600 uppercase font-bold tracking-tighter transition-colors"
          >
            Profile
          </a>
          <a
            href="/api-tokens"
            className="text-xs text-gray-500 hover:text-blue-600 uppercase font-bold tracking-tighter transition-colors"
          >
            API
          </a>
        </div>
      </div>
    );
  }

  // For regular admins, show appropriate navbar
  const isAdmin = roles?.includes('Admin1') || roles?.includes('Admin2');
  
  return isAdmin ? <NavbarAdmin /> : <NavbarGuest />;
}
