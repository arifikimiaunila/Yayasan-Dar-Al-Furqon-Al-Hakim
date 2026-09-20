import React from 'react';
import { Link } from '@inertiajs/react';

interface BlueButtonProps {
  href?: string;
  children: React.ReactNode;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  as?: 'button' | 'a';
  disabled?: boolean;
  onClick?: () => void;
}

const BlueButton: React.FC<BlueButtonProps> = ({
  href,
  children,
  method = 'get',
  as = 'button',
  disabled = false,
  onClick,
}) => {
  const baseClass =
    `bg-blue-600 text-white rounded 
     px-4 py-2 sm:px-6 sm:py-3 
     text-sm sm:text-base 
     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 
     transition-colors duration-200 ease-in-out
     ` + (disabled ? 'opacity-50 cursor-not-allowed' : '');

  if (as === 'button') {
    return (
      <button
        type="submit"
        onClick={onClick}
        disabled={disabled}
        className={`${baseClass} w-full sm:w-auto`}
        aria-disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href ?? '#'}
      method={method}
      as={as}
      disabled={disabled}
      className={`${baseClass} w-full sm:w-auto`}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
};

export default BlueButton;
