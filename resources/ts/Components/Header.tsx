import { usePage } from '@inertiajs/react';

interface HeaderProps {
  currentRoute?: string;
}

export default function Header({ currentRoute = 'home' }: HeaderProps) {
  usePage();

  return (
    <>
      <header
        className="bg-white shadow-sm border-b"
        data-current-route={currentRoute}
        aria-label={`Current route: ${currentRoute}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flex container responsive */}
          <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-16 py-4 md:py-0">
            
            {/* Left Section: Logo & Title */}
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              <img
                src="/logo.png"
                alt="Logo Yayasan"
                className="h-10 w-auto"
              />
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-bold text-gray-800">
                  Yayasan Dar Al Furqon Al Hakim
                </h1>
                <p className="text-sm md:text-lg font-semibold text-blue-600">
                  Membentuk 29 Karakter Luhur
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
