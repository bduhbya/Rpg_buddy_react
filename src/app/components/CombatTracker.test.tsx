import { render, fireEvent, act, waitFor } from "@testing-library/react";
import CombatTracker from "./CombatTracker";
import "@testing-library/jest-dom";
import React from "react";
import strings from "../../strings";
import { mockCharacterFile } from "../lib/definitionMocks";
import { promptForFile } from "../lib/fileInput";
import { InitiativeInputDialogProps } from "./InitiativeInputDialog";
import { Character } from "../lib/definitions";

var handleCancelHook: () => void;
var handleConfirmHook: (newCharacter: Character) => void;
var addedCharacter: Character;

jest.mock("../lib/fileInput", () => ({
  promptForFile: jest.fn(),
}));

jest.mock(
  "./InitiativeInputDialog",
  () => (props: InitiativeInputDialogProps) => {
    handleCancelHook = props.onCancel;
    handleConfirmHook = props.onConfirm;
    addedCharacter = props.character;
    return <div>Mock InitiativeInputDialog</div>;
  },
);

describe("CombatTracker", () => {
  it("renders component initial ui", () => {
    const { getByText } = render(<CombatTracker />);
    const addToCombatButton = getByText(strings.addToCombatButton);
    const toggleSortButton = getByText(strings.descendingLabel);

    // Check that the buttons are rendered
    expect(addToCombatButton).toBeInTheDocument();
    expect(toggleSortButton).toBeInTheDocument();

    expect(getByText(strings.currentCharacterColumnLabel)).toBeInTheDocument();
    expect(getByText(strings.characterNameColumnLabel)).toBeInTheDocument();
    expect(getByText(strings.initiativeColumnLabel)).toBeInTheDocument();
  });

  // TODO: add tests for sorting to check active character is preserved
  it("toggles sort order correctly", () => {
    const { getByText } = render(<CombatTracker />);

    fireEvent.click(getByText(strings.descendingLabel));
    expect(getByText(strings.ascendingLabel)).toBeInTheDocument();

    fireEvent.click(getByText(strings.ascendingLabel));
    expect(getByText(strings.descendingLabel)).toBeInTheDocument();
  });

  it("handles null file input", async () => {
    const { getByText } = render(<CombatTracker />);
    (
      promptForFile as jest.MockedFunction<typeof promptForFile>
    ).mockResolvedValue(null);

    fireEvent.click(getByText(strings.addToCombatButton));

    // Wait for promises to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    await waitFor(() =>
      expect(getByText("Mock InitiativeInputDialog")).toBeInTheDocument(),
    );
    // File not selected dialog should be displayed
    expect(getByText(strings.fileNotSelected)).toBeInTheDocument();
  });

  it("handles file input error", async () => {
    const { getByText } = render(<CombatTracker />);
    (
      promptForFile as jest.MockedFunction<typeof promptForFile>
    ).mockRejectedValue(new Error("File input error"));

    fireEvent.click(getByText(strings.addToCombatButton));

    // Wait for promises to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(getByText(strings.fileNotSelected)).toBeInTheDocument();
  });

  it("inserts character", async () => {
    const { getByText } = render(<CombatTracker />);
    (
      promptForFile as jest.MockedFunction<typeof promptForFile>
    ).mockResolvedValue(mockCharacterFile);

    fireEvent.click(getByText(strings.addToCombatButton));

    // Wait for promises to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    await waitFor(() =>
      expect(getByText("Mock InitiativeInputDialog")).toBeInTheDocument(),
    );
    handleConfirmHook(addedCharacter);
    await waitFor(() =>
      expect(getByText(addedCharacter.name)).toBeInTheDocument(),
    );
    expect(getByText(addedCharacter.initiative.toString())).toBeInTheDocument();
  });

  it("confirms adding a character correctly", () => {
    const { getByText } = render(<CombatTracker />);

    // TODO: Mock the file input and FileReader to test confirming a character
  });

  it("cancels adding a character correctly", () => {
    const { getByText } = render(<CombatTracker />);

    // TODO: Mock the file input and FileReader to test canceling a character
  });

  it("moves a character up and down correctly", () => {
    const { getByText } = render(<CombatTracker />);

    // TODO: Mock the file input and FileReader to test moving a character
  });
});
