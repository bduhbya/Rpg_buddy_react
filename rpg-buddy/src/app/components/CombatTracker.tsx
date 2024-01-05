// components/CombatTracker.tsx
'use client';
import React, { useState } from 'react';
import { Character } from '../lib/definitions';

const CombatTracker: React.FC = () => {
  const [combatCharacters, setCombatCharacters] = useState<Character[]>([]);

  const handleAddToCombat = () => {
    // Logic to load character file, ask for initiative, and add to combatCharacters
    const input = document.createElement('input');
    input.type = 'file';

    // Listen for the "change" event when the user selects a file
    input.addEventListener('change', (event) => {
      const fileInput = event.target as HTMLInputElement;
      const files = fileInput.files;

      if (files && files.length > 0) {
        const file = files[0];

        const reader = new FileReader();

        // Read the contents of the file as text
        reader.readAsText(file);

        // Set up a callback for when the file reading is complete
        reader.onload = () => {
          try {
            // Parse the JSON content of the file
            const jsonData = JSON.parse(reader.result as string);

            // Prompt the user to enter initiative
            const initiativeInput = prompt('Enter Initiative for ' + jsonData.name, '');

            if (initiativeInput !== null) {
              const initiative = parseInt(initiativeInput, 10);

              const newCharacter: Character = {
                name: jsonData.name || 'Unknown',
                dynamicData: jsonData, // Store all dynamic data fields
                initiative: isNaN(initiative) ? 0 : initiative, // Use null if initiative is 0 a valid number
              };

              setCombatCharacters([...combatCharacters, newCharacter]);
            }

          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        };
      }
    });

    // Trigger a click event to open the file dialog
    input.click();
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

  return (
    <div>
      <h2>Combat Tracker</h2>
      <button onClick={handleAddToCombat}>Add Character to Combat</button>
      <table>
        <thead>
          <tr>
            <th>Character</th>
            <th>Initiative</th>
          </tr>
        </thead>
        <tbody>
          {/* Render rows based on combatCharacters */}
          {combatCharacters.map((character, index) => (
            <tr key={index} onClick={() => handleCharacterClick(character)}>
              <td>{character.name}</td>
              <td>{character.initiative}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CombatTracker;
