import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./../Display";
import userEvent from "@testing-library/user-event";

import mockFetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");

const displayProps = {
  name: "mock show",
  summary: "something",
  seasons: [
    { id: "abc", name: "season 1", episodes: [] },
    { id: "cde", name: "season 2", episodes: [] },
    { id: "fgh", name: "season 3", episodes: [] },
  ],
};

test("renders without errors with no props", async () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  mockFetchShow.mockResolvedValueOnce(displayProps);

  render(<Display />);

  const btn = screen.getByRole("button");
  userEvent.click(btn);

  await screen.findByTestId("show-container");
});

test("renders show season options matching your data when the button is clicked", async () => {
  mockFetchShow.mockResolvedValueOnce(displayProps);

  render(<Display />);

  const btn = screen.getByRole("button");
  userEvent.click(btn);

  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(3);
  });
});

test("display function when the fetch button is clicked", async () => {
  mockFetchShow.mockResolvedValueOnce(displayProps);
  const displayFunc = jest.fn();

  render(<Display displayFunc={displayFunc} />);

  const btn = screen.getByRole("button");
  userEvent.click(btn);

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});
  