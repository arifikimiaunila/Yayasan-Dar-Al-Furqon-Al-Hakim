import { ReactNode } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

interface LayoutProps {
  children?: ReactNode;
  currentRoute?: string;
}

export default function Layout({ children, currentRoute = 'home' }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Navigation */}
      <Header currentRoute={currentRoute} />

      {/* Main Content Area */}
      <main className="flex-1">
        <Body>{children}</Body>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
