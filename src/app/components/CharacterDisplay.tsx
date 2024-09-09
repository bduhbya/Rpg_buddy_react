import React, { useState } from "react";
// import strings from "@/strings";

export interface CharacterDisplayProps {
  sourceFile: File | null;
}

export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  sourceFile,
}) => {
  const [characterData, setCharacterData] = useState<JSON | null>(null);

  if (sourceFile !== null) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result as string);
        setCharacterData(jsonData);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(sourceFile);
  }

  if (characterData === null) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-black dark:text-white">No file selected</p>
      </div>
    );
  } else {
    const tableRows = Object.keys(characterData).map((key) => (
      <tr key={key}>
        <td className="font-bold"> {key}: </td>
        <td>{characterData[key]}</td>
      </tr>
    ));

    return (
      <div className="flex flex-col items-center justify-center">
        {characterData !== null && <div>{tableRows}</div>}
      </div>
    );
  }
};
