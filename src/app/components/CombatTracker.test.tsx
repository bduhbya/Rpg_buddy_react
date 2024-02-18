import { render, fireEvent } from "@testing-library/react";
import CombatTracker from "./CombatTracker";
import "@testing-library/jest-dom";
import React from "react";

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

    const addToCombatButton = getByText('Add Character to Combat');
    const toggleSortButton = getByText('Toggle Sort');

    // Check that the buttons are rendered
    expect(addToCombatButton).toBeInTheDocument();
    expect(toggleSortButton).toBeInTheDocument();

    // Simulate clicking the buttons
    // fireEvent.click(addToCombatButton);
    // fireEvent.click(toggleSortButton);

    // // Check that the click handlers were called
    // expect(handleAddToCombat).toHaveBeenCalled();
    // expect(handleToggleSortDescending).toHaveBeenCalled();

    expect(getByText("Descending")).toBeInTheDocument();
  });

  it("toggles sort order correctly", () => {
    const { getByText } = render(<CombatTracker />);

    fireEvent.click(getByText("Descending"));
    expect(getByText("Ascending")).toBeInTheDocument();

    fireEvent.click(getByText("Ascending"));
    expect(getByText("Descending")).toBeInTheDocument();
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
