import React from 'react';
import { Link } from '@inertiajs/react';

interface RedButtonLinkProps {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const RedButton: React.FC<RedButtonLinkProps> = ({ href, children, disabled }) => {
  const baseClass =
    `bg-red-600 text-white rounded 
     px-4 py-2 sm:px-6 sm:py-3 
     text-sm sm:text-base 
     hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 
     transition-colors duration-200 ease-in-out
     ` + (disabled ? 'opacity-50 cursor-not-allowed' : '');

  return (
    <Link
      href={href}
      as="button"
      disabled={disabled}
      className={`${baseClass} w-full sm:w-auto`}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
};

export default RedButton;
