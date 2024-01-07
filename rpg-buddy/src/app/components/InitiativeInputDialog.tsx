// components/InitiativeInputDialog.tsx
import React, { useState, useEffect } from "react";
import { Character } from "../lib/definitions";

type InitiativeInputDialogProps = {
    character: Character | null;
    onConfirm: (initiative: number) => void;
    onCancel: () => void;
    duplicateEntryOrEmpty: boolean;
};

const InitiativeInputDialog: React.FC<InitiativeInputDialogProps> = ({
    character,
    onConfirm,
    onCancel,
    duplicateEntryOrEmpty,
}) => {
    const [initiative, setInitiative] = useState<number>(0);
    const handleConfirm = () => {
        onConfirm(initiative);
    };
    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="bg-opacity-50 bg-gray-800 w-full h-full fixed"></div>
            <div className="modal bg-white p-8 rounded-lg z-10">
                <h2 className="text-2xl font-bold mb-4 text-black">{duplicateEntryOrEmpty ? "Duplicate Entry" : "Enter Initiative"}</h2>
                {character && <p>Character Name: {character.name}</p>}
                {duplicateEntryOrEmpty && <p className="mb-4">This character is already in the Combat list.</p>}
                <label className="block mb-4">
                    Initiative:
                    <input
                        type="number"
                        className="w-full border rounded p-2 appearance-none focus:outline-none focus:border-blue-500 text-black"
                        value={initiative}
                        onChange={(e) => setInitiative(parseInt(e.target.value, 10))}
                    />
                </label>
                <div className="flex space-x-4">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleConfirm}
                    >
                        {duplicateEntryOrEmpty ? "Update Initiative" : "Add Character"}
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InitiativeInputDialog;
