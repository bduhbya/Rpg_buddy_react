// components/CombatTracker.tsx
import React, { useState } from "react";
import { Character } from "../lib/definitions";
import InitiativeInputDialog from "./InitiativeInputDialog";
import {CheckmarkIconPositive} from "../lib/SVGIcons";

const CombatTracker: React.FC = () => {
  const [combatCharacters, setCombatCharacters] = useState<Character[]>([]);
  const [sortDescending, toggleSortDescending] = useState(true);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState<number>(0);
  const toggleButtonText = sortDescending ? "Descending" : "Ascending";
  const [pendingCharacter, setPendingCharacter] = useState<Character | null>(
    null,
  );


  const handleToggleSortDescending = () => {
    // Toggle the sort order
    toggleSortDescending(!sortDescending);

    // Update the selected character index based on the new order
    // When the ascending or descending order is toggled, the current
    // index should now be the same distance from the top of the array
    // as it was from the bottom of the array before toggling
    const newIndex = combatCharacters.length - currentCharacterIndex - 1;

    setCurrentCharacterIndex(newIndex);
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

  const handleConfirmAddCharacter = (newCharacter: Character) => {
    // Add the character to combatCharacters
    setCombatCharacters([...combatCharacters, newCharacter]);

    // Clear pendingCharacter
    setPendingCharacter(null);
  };

  const handleCancelAddCharacter = () => {
    // Clear pendingCharacter
    setPendingCharacter(null);
  };

  const handleCharacterClick = (character: Character) => {
    // TODO: activate a callback to set the character display in parent
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

  const handleMoveCharacter = (direction: "up" | "down") => {
    const newIndex =
      direction === "up"
        ? (currentCharacterIndex - 1 + combatCharacters.length) %
        combatCharacters.length
        : (currentCharacterIndex + 1) % combatCharacters.length;

    setCurrentCharacterIndex(newIndex);
  };

  // Check for duplicate names
  const isDuplicateOrEmpty = pendingCharacter?.name
    ? combatCharacters.some(
      (char) =>
        char.name === pendingCharacter.name || pendingCharacter.name == null,
    )
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
      )}
      <table className="border-collapse border">
        <thead>
          <tr>
            {/* New column for tracking the current character */}
            <th className="border p-2">Current</th>
            <th className="border p-2">Character</th>
            <th className="border p-2">Initiative</th>
          </tr>
        </thead>
        <tbody>
          {/* Render rows based on combatCharacters */}
          {combatCharacters.map((character, index) => (
            <tr
              key={index}
              onClick={() => handleCharacterClick(character)}
            // className={index === currentCharacterIndex ? "bg-gray-200" : ""}
            >
              <td className="border p-2">
                {index === currentCharacterIndex && CheckmarkIconPositive />}
              </td>
              <td className="border p-2">{character.name}</td>
              <td className="border p-2">{character.initiative}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Button to move the current character */}
      <div className="flex p-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full mb-4 mr-4"
          onClick={() => handleMoveCharacter("up")}
        >
          Move Up
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full mb-4"
          onClick={() => handleMoveCharacter("down")}
        >
          Move Down
        </button>
      </div>
    </div>
  );
};

export default CombatTracker;
