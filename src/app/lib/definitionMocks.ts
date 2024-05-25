import { Character } from "./definitions";
import path from "path";
import fs from "fs";

const mockCharacterDataPath = path.join(
  __dirname,
  "..",
  "testData",
  "character_data.json",
);
const mockCharacterData = fs.readFileSync(mockCharacterDataPath, "utf8");

const mockBadCharacterDataPath = path.join(
  __dirname,
  "..",
  "testData",
  "bad_character_data.json",
);
const mockBadCharacterData = fs.readFileSync(mockBadCharacterDataPath, "utf8");

const mockCharacterDataParsed = JSON.parse(mockCharacterData);
const characterFile = new File([mockCharacterData], mockCharacterDataPath);

export const mockBadCharacterFile = new File(
  [mockBadCharacterData],
  mockBadCharacterDataPath,
);

export const mockCharacter: Character = {
  name: mockCharacterDataParsed.name,
  initiative: 0,
  fileReference: characterFile,
  dynamicData: mockCharacterDataParsed,
};

export const mockCharacterFile = characterFile;
