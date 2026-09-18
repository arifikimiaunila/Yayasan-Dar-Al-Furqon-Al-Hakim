import { ReactNode } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { NavbarAdmin1 } from '@/Components/NavbarAdmin1';
import { NavbarSuperAdmin } from '@/Components/NavbarSuperAdmin';
import { getCookie } from '@/Layouts/ts-js part/getCookies'; // import fungsi

interface AppLayoutProps {
  children?: ReactNode;
  currentRoute?: string;
}

export default function Admin1({ children, currentRoute = 'home' }: AppLayoutProps) {
  // Ambil role dari cookies yang dibuat di app.blade.php
  const role = getCookie('user_role');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="transition-opacity duration-300 ease-in-out">
        <div className="flex min-h-screen flex-col">
          <Header currentRoute={currentRoute} />

          {/* Render navbar sesuai role */}
          {role === 'admin1' && <NavbarAdmin1 />}
          {role === 'superadmin' && <NavbarSuperAdmin />}

          <main
            className="flex-1 bg-cover bg-center"
            style={{ backgroundImage: "url('/path/to/your/background.jpg')" }}
          >
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
