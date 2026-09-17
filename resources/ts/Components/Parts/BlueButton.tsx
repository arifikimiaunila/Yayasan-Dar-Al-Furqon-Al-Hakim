import React from 'react';
import { Link } from '@inertiajs/react';

interface BlueButtonLinkProps {
  href: string;
  children: React.ReactNode;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  as?: 'button' | 'a';
  disabled?: boolean;
}

const BlueButton: React.FC<BlueButtonLinkProps> = ({
  href,
  children,
  method = 'get',
  as = 'button',
  disabled = false,
}) => {
  return (
    <Link
      href={href}
      method={method}
      as={as}
      disabled={disabled}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </Link>
  );
};

export default BlueButton;
