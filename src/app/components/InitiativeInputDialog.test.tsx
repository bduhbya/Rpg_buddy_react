import { render, fireEvent } from "@testing-library/react";
import InitiativeInputDialog from "./InitiativeInputDialog";
import { mockCharacter } from "../lib/definitionMocks";
import { DEFAULT_INITIATIVE } from "./InitiativeInputDialog";
import "@testing-library/jest-dom";
import React from "react";

describe("InitiativeInputDialog", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  it("renders correctly", () => {
    const { getByText, getByLabelText } = render(
      <InitiativeInputDialog
        character={mockCharacter}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        duplicateEntryOrEmpty={false}
      />,
    );

    expect(getByText("Enter Initiative")).toBeInTheDocument();
    expect(getByLabelText("Character Name:")).toHaveValue(mockCharacter.name);
    expect(getByLabelText("Initiative:")).toHaveValue(DEFAULT_INITIATIVE);
  });

  it("changes input values correctly", () => {
    const { getByLabelText } = render(
      <InitiativeInputDialog
        character={mockCharacter}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        duplicateEntryOrEmpty={false}
      />,
    );

    fireEvent.change(getByLabelText("Character Name:"), {
      target: { value: "New Name" },
    });
    fireEvent.change(getByLabelText("Initiative:"), {
      target: { value: "10" },
    });

    expect(getByLabelText("Character Name:")).toHaveValue("New Name");
    expect(getByLabelText("Initiative:")).toHaveValue(10);
  });

  it("prevents non-numeric initiative input", () => {
    const { getByLabelText } = render(
      <InitiativeInputDialog
        character={mockCharacter}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        duplicateEntryOrEmpty={false}
      />,
    );

    // Try to change the initiative to a non-numeric value
    fireEvent.change(getByLabelText("Initiative:"), {
      target: { value: "not a number" },
    });

    // Check that the initiative value has not changed
    expect(getByLabelText("Initiative:")).toHaveValue(DEFAULT_INITIATIVE);
  });

  it("calls onConfirm and onCancel correctly", () => {
    const { getByText } = render(
      <InitiativeInputDialog
        character={mockCharacter}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        duplicateEntryOrEmpty={false}
      />,
    );

    fireEvent.click(getByText("Add Character"));
    expect(mockOnConfirm).toHaveBeenCalled();

    fireEvent.click(getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
