import { render, fireEvent } from "@testing-library/react";
import CombatTracker from "./CombatTracker";
import "@testing-library/jest-dom";
import React from "react";

describe("CombatTracker", () => {
  it("renders correctly", () => {
    const { getByText } = render(<CombatTracker />);

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
