import React from 'react';
import { Link } from '@inertiajs/react';

interface BlueButtonProps {
  href?: string; // jadikan optional
  children: React.ReactNode;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  as?: 'button' | 'a';
  disabled?: boolean;
  onClick?: () => void; // tambahan untuk mode button
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
    `bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ` +
    (disabled ? 'opacity-50 cursor-not-allowed' : '');

  if (as === 'button') {
    return (
      <button
        type="submit"
        onClick={onClick}
        disabled={disabled}
        className={baseClass}
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
      className={baseClass}
    >
      {children}
    </Link>
  );
};

export default BlueButton;
