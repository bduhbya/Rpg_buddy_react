// components/CombatTracker.tsx
import React, { useState } from "react";
import { Character } from "../lib/definitions";
import InitiativeInputDialog from "./InitiativeInputDialog";
import { CheckmarkIconPositive } from "../lib/SVGIcons";
import strings from "@/strings";
import { promptForFile } from "../lib/fileInput";
import { BasicDialog, DialogData, DialogType } from "./BasicDialog";

export const activeCharacterTestId = "active-combat-character-row-";

export interface CombatTrackerProps {
  SetCharacterFile: (file: File) => void;
}

const CombatTracker: React.FC<CombatTrackerProps> = ({SetCharacterFile}) => {
  const DIRECTION_UP = "up";
  const DIRECTION_DOWN = "down";
  type Direction = typeof DIRECTION_UP | typeof DIRECTION_DOWN;

  const [combatCharacters, setCombatCharacters] = useState<Character[]>([]);
  const [sortDescending, toggleSortDescending] = useState(true);
  const toggleButtonText = sortDescending
    ? strings.descendingLabel
    : strings.ascendingLabel;
  const [pendingCharacter, setPendingCharacter] = useState<Character | null>(
    null,
  );
  const [currentDialogData, setCurrentDialogData] = useState<DialogData | null>(
    null,
  );

  const handleToggleSortDescending = () => {
    // Toggle the sort order
    toggleSortDescending(!sortDescending);
  };

  const handleAddToCombat = async () => {
    const file = await promptForFile();

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result as string);

          setPendingCharacter({
            name: jsonData.name || "UNKNOWN",
            fileReference: file,
            dynamicData: jsonData,
            initiative: 0,
            active: false,
          });
        } catch (error) {
          setCurrentDialogData(
            new DialogData(strings.fileParsingError, DialogType.WARNING),
          );
          console.error("Error parsing JSON file:", error);
        }
      };

      reader.readAsText(file);
    } else {
      setCurrentDialogData(
        new DialogData(strings.fileNotSelected, DialogType.WARNING),
      );
      console.log("No file selected");
    }
  };

  const handleConfirmAddCharacter = (newCharacter: Character) => {
    if (combatCharacters.length === 0) {
      newCharacter.active = true;
    }
    // Add the character to combatCharacters
    setCombatCharacters([...combatCharacters, newCharacter]);

    // Clear pendingCharacter
    setPendingCharacter(null);
  };

  const handleCancelAddCharacter = () => {
    // Clear pendingCharacter
    setPendingCharacter(null);
  };

  const handleCharacterClick = (character: Character, SetCharacterFile: (file: File) => void) => {
    SetCharacterFile(character.fileReference);
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

  const handleMoveActiveCharacter = (direction: Direction) => {
    var currentCharacterIndex = combatCharacters.findIndex(
      (char) => char.active,
    );
    const newIndex =
      direction === DIRECTION_UP
        ? (currentCharacterIndex - 1 + combatCharacters.length) %
          combatCharacters.length
        : (currentCharacterIndex + 1) % combatCharacters.length;

    // Update the active character
    const newCombatCharacters = [...combatCharacters];
    newCombatCharacters[currentCharacterIndex].active = false;
    newCombatCharacters[newIndex].active = true;
    setCombatCharacters(newCombatCharacters);
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
          {strings.addToCombatButton}
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full mb-4"
          onClick={handleToggleSortDescending}
        >
          {toggleButtonText}
        </button>
      </div>
      {/* Render the basic dialog */}
      {currentDialogData && (
        <BasicDialog
          dialogData={currentDialogData}
          onConfirm={() => setCurrentDialogData(null)}
        />
      )}
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
            <th className="border p-2">
              {strings.currentCharacterColumnLabel}
            </th>
            <th className="border p-2">{strings.characterNameColumnLabel}</th>
            <th className="border p-2">{strings.initiativeColumnLabel}</th>
          </tr>
        </thead>
        <tbody>
          {combatCharacters.map((character, index) => (
            <tr
              key={index}
              onClick={() => handleCharacterClick(character, SetCharacterFile)}
              className={character.active ? "bg-gray-200" : ""}
              data-testid={
                character.active ? `${activeCharacterTestId}${index}` : ""
              }
            >
              <td className="border p-2">
                {character.active && <CheckmarkIconPositive />}
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
          onClick={() => handleMoveActiveCharacter(DIRECTION_UP)}
        >
          {strings.moveUpLabel}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full mb-4"
          onClick={() => handleMoveActiveCharacter(DIRECTION_DOWN)}
        >
          {strings.moveDownLabel}
        </button>
      </div>
    </div>
  );
};

export default CombatTracker;
