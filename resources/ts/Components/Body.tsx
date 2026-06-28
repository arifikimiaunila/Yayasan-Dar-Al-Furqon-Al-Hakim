import { ReactNode } from 'react';

interface BodyProps {
  children?: ReactNode;
}

export default function Body({ children }: BodyProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="transition-opacity duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
}
