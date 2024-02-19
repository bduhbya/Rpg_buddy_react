import { render, fireEvent } from "@testing-library/react";
import CombatTracker from "./CombatTracker";
import "@testing-library/jest-dom";
import React from "react";
import strings from "../../strings";

describe("CombatTracker", () => {
  it("renders correctly", () => {
    const { getByText } = render(<CombatTracker />);
    //   const handleAddToCombat = jest.fn();
    // const handleToggleSortDescending = jest.fn();

    // const { getByText } = render(
    //   <CombatTracker
    //     handleAddToCombat={handleAddToCombat}
    //     handleToggleSortDescending={handleToggleSortDescending}
    //   />
    // );

    const addToCombatButton = getByText(strings.addToCombatButton);
    const toggleSortButton = getByText(strings.descendingLabel);

    // Check that the buttons are rendered
    expect(addToCombatButton).toBeInTheDocument();
    expect(toggleSortButton).toBeInTheDocument();

    // Simulate clicking the buttons
    // fireEvent.click(addToCombatButton);
    // fireEvent.click(toggleSortButton);

    // // Check that the click handlers were called
    // expect(handleAddToCombat).toHaveBeenCalled();
    // expect(handleToggleSortDescending).toHaveBeenCalled();

    expect(getByText(strings.currentCharacterColumnLabel)).toBeInTheDocument();
    expect(getByText(strings.characterNameColumnLabel)).toBeInTheDocument();
    expect(getByText(strings.initiativeColumnLabel)).toBeInTheDocument();
  });

  it("toggles sort order correctly", () => {
    const { getByText } = render(<CombatTracker />);

    fireEvent.click(getByText(strings.descendingLabel));
    expect(getByText(strings.ascendingLabel)).toBeInTheDocument();

    fireEvent.click(getByText(strings.ascendingLabel));
    expect(getByText(strings.descendingLabel)).toBeInTheDocument();
  });

  it("adds a character to combat correctly", () => {
    const { getByText } = render(<CombatTracker />);

    // TODO: Mock the file input and FileReader to test adding a character
    // TODO:  may need to create a file loading component to test this
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
