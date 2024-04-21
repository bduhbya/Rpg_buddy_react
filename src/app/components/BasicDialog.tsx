import React, { useState } from 'react';

interface BasicDialogProps {
  message: string;
  dialogType?: 'warning' | 'error' | 'info';
}

const BasicDialog: React.FC<BasicDialogProps> = ({ message, dialogType }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleConfirm = () => {
    setIsVisible(false);
  };

  const dialogDetails = {
    warning: { title: 'Warning', icon: '⚠️' },
    error: { title: 'Error', icon: '❌' },
    info: { title: 'Info', icon: 'ℹ️' },
  };

  const { title, icon } = dialogDetails[dialogType || 'info'];

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-opacity-50 bg-gray-800 w-full h-full fixed"></div>
      <div className="modal bg-white p-8 rounded-lg z-10">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {icon} {title}
        </h2>
        <p>{message}</p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default BasicDialog;