import React from 'react';

interface RedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const RedButton: React.FC<RedButtonProps> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      {children}
    </button>
  );
};

export default RedButton;
