import React, { useState } from "react";
// import strings from "@/strings";

export interface CharacterDisplayProps {
  sourceFile: File | null;
}

export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  sourceFile,
}) => {
  const [characterData, setCharacterData] = useState<String | null>(null);

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
    
  return (
    <div className="flex flex-col items-center justify-center">
      {characterData === null && <p className="text-black dark:text-white">No file selected</p>}
      {characterData !== null && (
        <div>{JSON.stringify(characterData)}</div>
      )}
    </div>
  );
};
