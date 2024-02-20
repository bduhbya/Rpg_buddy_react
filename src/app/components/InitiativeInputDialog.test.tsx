import { render, fireEvent } from "@testing-library/react";
import InitiativeInputDialog from "./InitiativeInputDialog";
import { mockCharacter } from "../lib/definitionMocks";
import { DEFAULT_INITIATIVE } from "./InitiativeInputDialog";
import "@testing-library/jest-dom";
import React from "react";
import strings from "@/strings";

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

    expect(getByText(strings.initiativePrompt)).toBeInTheDocument();
    expect(getByLabelText(strings.characterLabel)).toHaveValue(
      mockCharacter.name,
    );
    expect(getByLabelText(strings.initiativeLabel)).toHaveValue(
      DEFAULT_INITIATIVE,
    );
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

    fireEvent.change(getByLabelText(strings.characterLabel), {
      target: { value: "New Name" },
    });
    fireEvent.change(getByLabelText(strings.initiativeLabel), {
      target: { value: "10" },
    });

    expect(getByLabelText(strings.characterLabel)).toHaveValue("New Name");
    expect(getByLabelText(strings.initiativeLabel)).toHaveValue(10);
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
    fireEvent.change(getByLabelText(strings.initiativeLabel), {
      target: { value: "not a number" },
    });

    // Check that the initiative value has not changed
    expect(getByLabelText(strings.initiativeLabel)).toHaveValue(
      DEFAULT_INITIATIVE,
    );
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

    fireEvent.click(getByText(strings.addCharacterButton));
    expect(mockOnConfirm).toHaveBeenCalled();

    fireEvent.click(getByText(strings.cancelString));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
