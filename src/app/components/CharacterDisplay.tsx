import React from "react";
// import strings from "@/strings";

export interface CharacterDisplayProps {
  sourceFile: File | null;
}

export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  sourceFile,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {sourceFile === null && <p className="text-black dark:text-white">No file selected</p>}
      {sourceFile !== null && (
        <>
          <img
            src={URL.createObjectURL(sourceFile)}
            alt={"Character Data"}
            className="w-64 h-64 rounded-full"
          />
          <p className="text-black">{sourceFile.name}</p>
        </>
      )}
    </div>
  );
};
