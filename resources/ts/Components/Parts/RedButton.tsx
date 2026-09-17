import React from 'react';
import { Link } from '@inertiajs/react';

interface RedButtonLinkProps {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const RedButton: React.FC<RedButtonLinkProps> = ({ href, children, disabled }) => {
  return (
    <Link
      href={href}
      as="button"
      disabled={disabled}
      className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </Link>
  );
};

export default RedButton;
