import { Character } from "./definitions";

const characterFile = new File([], "../testData/character_data.json");

export const mockCharacter: Character = {
  name: "Test",
  initiative: 0,
  fileReference: characterFile,
  dynamicData: {},
};

  export const mockCharacterFile = characterFile;