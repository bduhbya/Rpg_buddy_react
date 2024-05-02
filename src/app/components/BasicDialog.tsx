import React from 'react';

export enum DialogType {
  WARNING = 'Warning',
  ERROR = 'Error',
  INFO = 'Info'
}

interface DialogDetail {
  title: string;
  icon: string;
}

const dialogDetails: Record<DialogType, DialogDetail> = {
  [DialogType.WARNING]: { title: 'Warning', icon: '⚠️' },
  [DialogType.ERROR]: { title: 'Error', icon: '❌' },
  [DialogType.INFO]: { title: 'Info', icon: 'ℹ️' },
};

export class DialogData {
  constructor(public message: string, public dialogType: DialogType) {}
}

export interface BasicDialogProps {
  dialogData: DialogData;
  onConfirm: () => void;
}

export const BasicDialog: React.FC<BasicDialogProps> = ({ dialogData, onConfirm }) => {

  const handleConfirm = () => {
    onConfirm();
  };

  const { title, icon } = dialogDetails[dialogData.dialogType];

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-opacity-50 bg-gray-800 w-full h-full fixed"></div>
      <div className="modal bg-white p-8 rounded-lg z-10">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {icon} {title}
        </h2>
        <p className="text-black">{dialogData.message}</p>
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