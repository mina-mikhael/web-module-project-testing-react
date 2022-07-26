import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Show from "./../Show";
import userEvent from "@testing-library/user-event";

const showProps = {
  name: "mock show",
  summary: "something",
  seasons: [
    { id: "abc", name: "season 1", episodes: [] },
    { id: "cde", name: "season 2", episodes: [] },
    { id: "fgh", name: "season 3", episodes: [] },
  ],
};

test("renders without errors", () => {
  render(<Show show={showProps} selectedSeason={"none"} />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} />);

  screen.getByTestId("loading-container");
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={showProps} selectedSeason={"none"} />);
  const seasonsOptions = screen.getAllByTestId("season-option");
  expect(seasonsOptions).toHaveLength(3);
});

test("handleSelect is called when an season is selected", () => {
  const selectHandler = jest.fn();
  render(<Show show={showProps} selectedSeason={"none"} handleSelect={selectHandler} />);

  const selectSeason = screen.getByLabelText(/Select A Season/i);
  userEvent.selectOptions(selectSeason, ["abc"]);
  expect(selectHandler).toHaveBeenCalled();
  expect(selectHandler).toHaveBeenCalledTimes(1);
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  const { rerender } = render(<Show show={showProps} selectedSeason={"none"} />);
  const episodesNotSelected = screen.queryByTestId("episodes-container");

  expect(episodesNotSelected).not.toBeInTheDocument();

  rerender(<Show show={showProps} selectedSeason={2} />);
  const episodesSelected = screen.queryByTestId("episodes-container");
  expect(episodesSelected).toBeInTheDocument();
});

