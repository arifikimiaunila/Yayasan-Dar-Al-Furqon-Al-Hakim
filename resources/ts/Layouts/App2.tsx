import { ReactNode } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

interface AppLayoutProps {
  children?: ReactNode;
  currentRoute?: string;
}

export default function App2({ children, currentRoute = 'home' }: AppLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="transition-opacity duration-300 ease-in-out">
        <div className="flex min-h-screen flex-col">
          <Header currentRoute={currentRoute} />
          <main
            className="flex-1 bg-cover bg-center"
            style={{ backgroundImage: "url('/path/to/your/background.jpg')" }}
          >
            {/* Konten utama */}
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
