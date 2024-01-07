// components/CombatTracker.tsx
import React, { useState } from "react";
import { Character } from "../lib/definitions";
import InitiativeInputDialog from "./InitiativeInputDialog";

const CombatTracker: React.FC = () => {
  const [combatCharacters, setCombatCharacters] = useState<Character[]>([]);
  const [sortDescending, toggleSortDescending] = useState(true);
  const toggleButtonText = sortDescending ? "Descending" : "Ascending";
  const [pendingCharacter, setPendingCharacter] = useState<Character | null>(null);

  const handleToggleSortDescending = () => {
    toggleSortDescending(!sortDescending);
  };

  const handleAddToCombat = () => {
    // TODO: create utility
    // Prompt for opening a character file
    const input = document.createElement("input");
    input.type = "file";

    input.addEventListener("change", (event) => {
      const fileInput = event.target as HTMLInputElement;
      const files = fileInput.files;

      if (files && files.length > 0) {
        const file = files[0];

        const reader = new FileReader();

        reader.onload = () => {
          try {
            // Save the file contents in pendingCharacter
            const jsonData = JSON.parse(reader.result as string);

            setPendingCharacter({
              name: jsonData.name || "UNKNOWN",
              fileReference: file,
              dynamicData: jsonData,
              initiative: 0,
            });
          } catch (error) {
            console.error("Error parsing JSON file:", error);
          }
        };

        reader.readAsText(file);
      }
    });

    input.click();
  };

  const handleConfirmAddCharacter = (initiative: number) => {
    if (pendingCharacter) {
      const newCharacter: Character = {
        ...pendingCharacter,
        initiative: isNaN(initiative) ? 0 : initiative,
      };

      // Add the character to combatCharacters
      setCombatCharacters([...combatCharacters, newCharacter]);

      // Clear pendingCharacter
      setPendingCharacter(null);
    }
  };

  const handleCancelAddCharacter = () => {
    // Clear pendingCharacter
    setPendingCharacter(null);
  };

  const handleCharacterClick = (character: Character) => {
    // Show a modal or use alert to display the dynamic data
    const dynamicDataKeys = Object.keys(character.dynamicData);

    const tableRows = dynamicDataKeys.map((key) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{character.dynamicData[key]}</td>
      </tr>
    ));

    const modalContent = (
      <div>
        <h3>{character.name} - Dynamic Data</h3>
        <table>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );

    // Using window.alert for simplicity, consider using a modal library for a better user experience
    window.alert(JSON.stringify(character.dynamicData, null, 2));
  };

  // Check for duplicate names
  const isDuplicateOrEmpty = pendingCharacter?.name
    ? combatCharacters.some((char) => char.name === pendingCharacter.name || pendingCharacter.name == null)
    : false;

  if (sortDescending) {
    combatCharacters.sort((a, b) => b.initiative - a.initiative);
  } else {
    combatCharacters.sort((a, b) => a.initiative - b.initiative);
  }
  return (
    <div>
      <div className="flex p-2">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full mb-4 mr-4"
          onClick={handleAddToCombat}
        >
          Add Character to Combat
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full mb-4"
          onClick={handleToggleSortDescending}
        >
          {toggleButtonText}
        </button>
      </div>
      {/* Render the custom initiative input dialog */}
      {pendingCharacter && (
        <InitiativeInputDialog
          character={pendingCharacter}
          onConfirm={handleConfirmAddCharacter}
          onCancel={handleCancelAddCharacter}
          duplicateEntryOrEmpty={isDuplicateOrEmpty}
        />
      )
      }
      <table className="border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Character</th>
            <th className="border p-2">Initiative</th>
          </tr>
        </thead>
        <tbody>
          {/* Render rows based on combatCharacters */}
          {combatCharacters.map((character, index) => (
            <tr key={index} onClick={() => handleCharacterClick(character)}>
              <td className="border p-2">{character.name}</td>
              <td className="border p-2">{character.initiative}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CombatTracker;
