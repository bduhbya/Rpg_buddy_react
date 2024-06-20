import {
  render,
  fireEvent,
  act,
  waitFor,
  queryAllByText,
  getByTestId,
} from "@testing-library/react";
import CombatTracker, { activeCharacterTestId } from "./CombatTracker";
import "@testing-library/jest-dom";
import React from "react";
import strings from "../../strings";
import {
  mockBadmockSingleCharacterFile_warrior,
  mockSingleCharacterMageFile,
  mockSingleCharacterWarrior,
  mockSingleCharacterWarriorFile,
} from "../lib/definitionMocks";
import { promptForFile } from "../lib/fileInput";
import { InitiativeInputDialogProps } from "./InitiativeInputDialog";
import { Character } from "../lib/definitions";

var handleCancelHook: () => void;
var handleConfirmHook: (newCharacter: Character) => void;
var addedCharacter: Character;

jest.mock("../lib/fileInput", () => ({
  promptForFile: jest.fn(),
}));

jest.mock("./InitiativeInputDialog", () => {
  const MockInitiativeInputDialog = (props: InitiativeInputDialogProps) => {
    handleCancelHook = props.onCancel;
    handleConfirmHook = props.onConfirm;
    addedCharacter = props.character;
    return <div>Mock InitiativeInputDialog</div>;
  };

  MockInitiativeInputDialog.displayName = "MockInitiativeInputDialog";

  return MockInitiativeInputDialog;
});

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

  // This test is not working as expected
  // it("handles null file input", async () => {
  //   const { getByText } = render(<CombatTracker />);
  //   (
  //     promptForFile as jest.MockedFunction<typeof promptForFile>
  //   ).mockResolvedValue(null);

  //   fireEvent.click(getByText(strings.addToCombatButton));

  //   // Wait for promises to resolve
  //   await new Promise((resolve) => setTimeout(resolve, 0));

  //   await waitFor(() =>
  //     expect(getByText("Mock InitiativeInputDialog")).toBeInTheDocument(),
  //   );
  //   // File not selected dialog should be displayed
  //   await waitFor(() =>
  //     expect(getByText(strings.fileNotSelected)).toBeInTheDocument(),
  //   );
  // });

  it("handles bad json format", async () => {
    const { getByText } = render(<CombatTracker />);
    (
      promptForFile as jest.MockedFunction<typeof promptForFile>
    ).mockResolvedValue(mockBadmockSingleCharacterFile_warrior);

    fireEvent.click(getByText(strings.addToCombatButton));

    // Wait for promises to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    await waitFor(() =>
      expect(getByText(strings.fileParsingError)).toBeInTheDocument(),
    );
  });

  it("inserts character", async () => {
    const { getByText, queryAllByText } = render(<CombatTracker />);
    await addCharacterAndCheck(
      mockSingleCharacterWarriorFile,
      1,
      getByText,
      queryAllByText,
    );
  });

  it("moves current active character down correctly", async () => {
    const { getByText, queryAllByText, getByTestId } = render(
      <CombatTracker />,
    );
    const moveDownButton = getByText(strings.moveDownLabel);
    const mockCharacterFiles = [
      mockSingleCharacterWarriorFile,
      mockSingleCharacterWarriorFile,
    ];

    for (let i = 0; i < mockCharacterFiles.length; i++) {
      const expectedCharacterCount = i + 1;
      await addCharacterAndCheck(
        mockCharacterFiles[i],
        expectedCharacterCount,
        getByText,
        queryAllByText,
      );
    }

    var activeCharacterRow = getByTestId(`${activeCharacterTestId}0`);
    expect(activeCharacterRow).not.toBeNull();
    act(() => fireEvent.click(moveDownButton)); // Move the active character down
    await waitFor(() => {
      activeCharacterRow = getByTestId(`${activeCharacterTestId}1`);
      expect(activeCharacterRow).not.toBeNull();
    });
  });

  // Helper functions

  async function addCharacterAndCheck(
    characterFile: File,
    expectedCharacterCount: number,
    getByText: Function,
    queryAllByText: Function,
  ) {
    (
      promptForFile as jest.MockedFunction<typeof promptForFile>
    ).mockResolvedValue(characterFile);

    fireEvent.click(getByText(strings.addToCombatButton));

    // Wait for promises to resolve
    new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() =>
      expect(getByText("Mock InitiativeInputDialog")).toBeInTheDocument(),
    );
    act(() => handleConfirmHook(addedCharacter));
    await waitFor(() => {
      const characterElements = queryAllByText(addedCharacter.name);
      expect(characterElements.length === expectedCharacterCount);
    });
    const initiativeElements = queryAllByText(
      addedCharacter.initiative.toString(),
    );
    expect(initiativeElements.length === expectedCharacterCount);
  }
});
