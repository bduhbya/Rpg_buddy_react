import { Character } from "./definitions";
import path from "path";
import fs from "fs";

const mockSingleCharacterWarriorDataPath = path.join(
  __dirname,
  "..",
  "testData",
  "character_data.json",
);
const mockSingleCharacterWarriorData = fs.readFileSync(
  mockSingleCharacterWarriorDataPath,
  "utf8",
);

const mockSingleCharacterMageDataPath = path.join(
  __dirname,
  "..",
  "testData",
  "character_data_mage.json",
);
const mockSingleCharacterMageData = fs.readFileSync(
  mockSingleCharacterMageDataPath,
  "utf8",
);

const mockBadCharacterDataPath = path.join(
  __dirname,
  "..",
  "testData",
  "bad_character_data.json",
);
const mockBadCharacterData = fs.readFileSync(mockBadCharacterDataPath, "utf8");

const mockSingleCharacterWarriorDataParsed = JSON.parse(
  mockSingleCharacterWarriorData,
);
const mockSingleCharacterMageDataParsed = JSON.parse(
  mockSingleCharacterMageData,
);

const mockSingleCharacterFile_warrior = new File(
  [mockSingleCharacterWarriorData],
  mockSingleCharacterWarriorDataPath,
);
const mockSingleCharacterFile_mage = new File(
  [mockSingleCharacterMageData],
  mockSingleCharacterMageDataPath,
);

export const mockBadmockSingleCharacterFile_warrior = new File(
  [mockBadCharacterData],
  mockBadCharacterDataPath,
);

export const mockSingleCharacterWarrior: Character = {
  name: mockSingleCharacterWarriorDataParsed.name,
  initiative: 0,
  fileReference: mockSingleCharacterFile_warrior,
  active: false,
  initiativeDisplay: 0
};

export const mockSingleCharacterMage: Character = {
  name: mockSingleCharacterMageDataParsed.name,
  initiative: 0,
  fileReference: mockSingleCharacterFile_mage,
  active: false,
  initiativeDisplay: 0
};

export const mockSingleCharacterWarriorFile = mockSingleCharacterFile_warrior;
export const mockSingleCharacterMageFile = mockSingleCharacterFile_mage;
