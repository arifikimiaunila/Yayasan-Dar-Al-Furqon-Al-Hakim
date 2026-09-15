import { ReactNode } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { NavbarGuest } from '../Components/NavbarGuest';

interface AppLayoutProps {
  children?: ReactNode;
  currentRoute?: string;
}

export default function App({ children, currentRoute = 'home' }: AppLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="transition-opacity duration-300 ease-in-out">
        <div className="flex min-h-screen flex-col">
          <Header currentRoute={currentRoute} />
          <NavbarGuest />
          <main
            className="flex-1 bg-cover bg-center"
            style={{ backgroundImage: "url('/path/to/your/background.jpg')" }}
          >
            {/* Konten utama */}
            {children}

            {/* Section dengan link */}
            <section className="mt-8 p-6 bg-white bg-opacity-80 rounded shadow-lg max-w-xl mx-auto text-center">
              <h2 className="text-xl font-bold mb-4">Tautan Terkait</h2>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.forumforsgi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Forum FORSGI
                  </a>
                </li>
                <li>
                  <a href="https://generusindonesia.id/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Generus Indonesia
                  </a>
                </li>
                <li>
                  <a href="https://www.ldii.or.id/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    LDII
                  </a>
                </li>
                <li>
                  <a href="https://www.senkom.or.id/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Senkom
                  </a>
                </li>
                <li>
                  <a href="https://official.asad.or.id/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Asad Official
                  </a>
                </li>
              </ul>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
