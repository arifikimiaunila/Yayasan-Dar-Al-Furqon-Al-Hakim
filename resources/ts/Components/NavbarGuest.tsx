import { useState, useRef, useEffect } from 'react';

interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export default function NavbarGuest() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const yayasanRef = useRef<HTMLDivElement>(null);
  const kontenRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      yayasanRef.current &&
      !yayasanRef.current.contains(event.target as Node)
    ) {
      if (
        kontenRef.current &&
        !kontenRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
  };

  const handleShortcut = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'Y') {
      event.preventDefault();
      setIsVisible(!isVisible);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleShortcut);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleShortcut);
    };
  }, [isVisible, activeDropdown]);

  return (
    <nav className="flex items-center space-x-6">
      {/* Link Publik Biasa */}
      <a
        href="/"
        className="text-gray-600 hover:text-blue-600 transition-colors"
      >
        Beranda
      </a>

      {/* Menu Dropdown: Yayasan */}
      <div className="relative" ref={yayasanRef}>
        <button
          onClick={() => toggleDropdown('yayasan')}
          className={`flex items-center space-x-1 text-gray-600 hover:text-blue-600 focus:outline-none transition-colors ${
            activeDropdown === 'yayasan' ? 'text-blue-600 font-bold' : ''
          }`}
        >
          <span>Yayasan</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-200 ${
              activeDropdown === 'yayasan' ? 'rotate-180' : ''
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

        {activeDropdown === 'yayasan' && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
              <a
                href="/posts/1"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Visi
              </a>
              <a
                href="/posts/2"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Misi
              </a>
              <a
                href="/posts/3"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Sejarah
              </a>
              <a
                href="/pengurus"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                👥 Pengurus
              </a>
              <a
                href="/yayasan/lokasi"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Lokasi Kantor
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Menu Dropdown: Konten */}
      <div className="relative" ref={kontenRef}>
        <button
          onClick={() => toggleDropdown('konten')}
          className={`flex items-center space-x-1 text-gray-600 hover:text-blue-600 focus:outline-none transition-colors ${
            activeDropdown === 'konten' ? 'text-blue-600 font-bold' : ''
          }`}
        >
          <span>Konten</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-200 ${
              activeDropdown === 'konten' ? 'rotate-180' : ''
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

        {activeDropdown === 'konten' && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
              <a
                href="/video"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
              >
                📽️ Galeri Video
              </a>
              <a
                href="/files"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
              >
                📁 Arsip File
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Tombol Login (Hidden) */}
      {isVisible && (
        <div className="flex items-center animate-in fade-in duration-200">
          <a
            href="/login"
            className="bg-slate-800 text-white px-4 py-1.5 rounded-full shadow-xl text-xs font-bold tracking-wider border border-slate-700 hover:bg-red-600 transition-all duration-300 uppercase"
          >
            🔒 Staff Access
          </a>
        </div>
      )}
    </nav>
  );
}
