import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  DialogType,
  DialogData,
  BasicDialog,
  dialogDetails,
} from "./BasicDialog";

const getExpectedTitle = (type: DialogType) => {
  const { title, icon } = dialogDetails[type];
  return icon + " " + title;
};

const message = "Test message";

describe("BasicDialog", () => {
  it("renders info message", () => {
    const type = DialogType.INFO;
    const dialogData = new DialogData(message, type);
    const { getByText } = render(
      <BasicDialog dialogData={dialogData} onConfirm={() => {}} />,
    );
    const dialogTitle = getExpectedTitle(type);
    expect(getByText(dialogTitle)).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });

  it("renders warning message", () => {
    const type = DialogType.WARNING;
    const dialogData = new DialogData(message, type);
    const { getByText } = render(
      <BasicDialog dialogData={dialogData} onConfirm={() => {}} />,
    );
    const dialogTitle = getExpectedTitle(type);
    expect(getByText(dialogTitle)).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });

  it("renders error message", () => {
    const type = DialogType.ERROR;
    const dialogData = new DialogData(message, type);
    const { getByText } = render(
      <BasicDialog dialogData={dialogData} onConfirm={() => {}} />,
    );
    const dialogTitle = getExpectedTitle(type);
    expect(getByText(dialogTitle)).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const dialogData = new DialogData(message, DialogType.INFO);
    const onConfirm = jest.fn();
    const { getByText } = render(
      <BasicDialog dialogData={dialogData} onConfirm={onConfirm} />,
    );
    fireEvent.click(getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalled();
  });
});
