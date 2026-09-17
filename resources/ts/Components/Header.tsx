import { usePage } from '@inertiajs/react';

interface HeaderProps {
  currentRoute?: string;
}

export default function Header({ currentRoute = 'home' }: HeaderProps) {
  const { component } = usePage();

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left Section: Logo & Title */}
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Logo Yayasan"
                className="h-10 w-auto mr-3"
              />
              <h1 className="text-xl font-bold text-gray-800">
                Yayasan Dar Al Furqon Al Hakim
              </h1>
              <p className="text-lg font-semibold text-blue-600">
                Membentuk 29 Karakter Luhur
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
