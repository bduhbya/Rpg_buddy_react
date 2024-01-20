import { Character } from "./definitions";

export const mockCharacter: Character = {
  name: "Test",
  initiative: 0,
  fileReference: new File([], "../testData/character_data.json"),
  dynamicData: {},
};
