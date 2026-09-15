import React from 'react';

interface BlueButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BlueButton: React.FC<BlueButtonProps> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {children}
    </button>
  );
};

export default BlueButton;
