import type { ReactNode } from 'react';
import Header from '../Components/Header';
import Body from '../Components/Body';
import Footer from '../Components/Footer';

interface AppLayoutProps {
    children?: ReactNode;
    currentRoute?: string;
}

export default function App({ children, currentRoute = 'home' }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header currentRoute={currentRoute} />
            <main className="flex-1">
                <Body>{children}</Body>
            </main>
            <Footer />
        </div>
    );
}
