// components/InitiativeInputDialog.tsx
import React, { useState } from "react";
import { Character } from "../lib/definitions";
import strings from "@/strings";

export type InitiativeInputDialogProps = {
  character: Character;
  onConfirm: (
    newCharacter: Character,
    SetCharacterFile: (file: File) => void,
  ) => void;
  onCancel: () => void;
  duplicateEntryOrEmpty: boolean;
  SetCharacterFile: (file: File) => void;
};
export const DEFAULT_INITIATIVE = 0;

const InitiativeInputDialog: React.FC<InitiativeInputDialogProps> = ({
  character,
  onConfirm,
  onCancel,
  duplicateEntryOrEmpty,
  SetCharacterFile,
}) => {
  const [initiative, setInitiative] = useState<number>(DEFAULT_INITIATIVE);
  const [name, setName] = useState<string>(character.name);
  const handleConfirm = () => {
    const newCharacter: Character = {
      ...character,
      name: name,
      initiative: initiative,
      initiativeDisplay: initiative,
    };
    onConfirm(newCharacter, SetCharacterFile);
  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-opacity-50 bg-gray-800 w-full h-full fixed"></div>
      <div className="modal bg-white p-8 rounded-lg z-10">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {strings.initiativePrompt}
        </h2>
        {duplicateEntryOrEmpty && (
          <p className="mb-4 text-black">
            {strings.characterAlreadyPresentWarning}
          </p>
        )}
        <label className="block mb-4">
          {strings.characterLabel}
          <input
            type="string"
            className="w-full border rounded p-2 appearance-none focus:outline-none focus:border-blue-500 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          {strings.initiativeLabel}
          <input
            type="number"
            className="w-full border rounded p-2 appearance-none focus:outline-none focus:border-blue-500 text-black"
            value={initiative}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value)) {
                setInitiative(value);
              }
            }}
          />
        </label>
        <div className="flex space-x-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleConfirm}
          >
            {strings.addCharacterButton}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleCancel}
          >
            {strings.cancelString}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitiativeInputDialog;
