import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Adjust import path as needed

interface User {
  name?: string;
}

export default function NavbarAdmin() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { user, roles, logout } = useAuth();

  const pengurusRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLDivElement>(null);

  const isAdmin = roles?.includes('Admin1') || roles?.includes('Admin2') || roles?.includes('superadministration');

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const refs = [pengurusRef, postRef, videoRef, fileRef];
    const isClickInside = refs.some(
      (ref) => ref.current && ref.current.contains(event.target as Node)
    );
    if (!isClickInside) {
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  if (!isAdmin) return null;

  return (
    <nav className="flex items-center justify-between w-full">
      {/* Left Section: Admin Navigation Menu */}
      <div className="flex items-center space-x-6">
        {/* Back to Public Home */}
        <a
          href="/"
          className="flex items-center text-red-600 hover:text-red-700 font-medium transition-colors border-r pr-6 border-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home Publik
        </a>

        {/* Dropdown 1: Manajemen Pengurus */}
        <div className="relative" ref={pengurusRef}>
          <button
            onClick={() => toggleMenu('pengurus')}
            className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none transition-colors ${
              openMenu === 'pengurus' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Pengurus Yayasan
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-200 ${
                openMenu === 'pengurus' ? 'rotate-180' : ''
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

          {openMenu === 'pengurus' && (
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <a
                  href="/pengurus"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  📋 Daftar Pengurus
                </a>
                <a
                  href="/pengurus/create"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  ➕ Tambah Pengurus Baru
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Dropdown 2: Manajemen Postingan */}
        <div className="relative" ref={postRef}>
          <button
            onClick={() => toggleMenu('post')}
            className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none transition-colors ${
              openMenu === 'post' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              Artikel & Berita
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-200 ${
                openMenu === 'post' ? 'rotate-180' : ''
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

          {openMenu === 'post' && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <a
                  href="/post/create"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  ✍️ Buat Postingan
                </a>
                <a
                  href="/post/edit"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  📑 Kelola Artikel
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Dropdown 3: Manajemen Video */}
        <div className="relative" ref={videoRef}>
          <button
            onClick={() => toggleMenu('video')}
            className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none transition-colors ${
              openMenu === 'video' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Manajemen Video
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-200 ${
                openMenu === 'video' ? 'rotate-180' : ''
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

          {openMenu === 'video' && (
            <div className="absolute left-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <a
                  href="/video"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  📽️ Daftar Video
                </a>
                <a
                  href="/video/create"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  ➕ Upload Video
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Dropdown 4: Manajemen File */}
        <div className="relative" ref={fileRef}>
          <button
            onClick={() => toggleMenu('file')}
            className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none transition-colors ${
              openMenu === 'file' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Pusat File
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-200 ${
                openMenu === 'file' ? 'rotate-180' : ''
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

          {openMenu === 'file' && (
            <div className="absolute left-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <a
                  href="/files"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  📁 Semua File
                </a>
                <a
                  href="/file/create"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  📤 Upload File Baru
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Admin Profile & Logout */}
      <div className="flex items-center space-x-4 pl-6 border-l border-gray-200 ml-6">
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-gray-800">{user?.name || 'Admin'}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {roles?.[0] || 'Staff'}
          </p>
        </div>

        <button
          onClick={() => logout?.()}
          className="flex items-center bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-700 px-3 py-1.5 rounded transition-colors focus:outline-none"
          title="Keluar dari sistem"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-sm font-medium">Keluar</span>
        </button>
      </div>
    </nav>
  );
}
