import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';


const episodeProps = {
  id: "xuz111",
  name: "tvShow",
  image: "https://i.ibb.co/2FsfXqM/stranger-things.png",
  season: 1,
  number: 1,
  summary: "I have no idea what that tvShow is all about",
  runtime: 4,
};

const episodePropsWithNoImg = {
  id: "xuz111",
  name: "tvShow",
  image: null,
  season: 1,
  number: 1,
  summary: "I have no idea what that tvShow is all about",
  runtime: 4,
};

test("renders without error", () => {
  render(<Episode episode={episodeProps} />);
});

test("renders the summary test passed as prop", () => {
  render(<Episode episode={episodeProps} />);

  const summary = screen.queryByText("I have no idea what that tvShow is all about");
  expect(summary).toBeInTheDocument();
  expect(summary).toHaveTextContent(/I have no idea what that tvShow is all about/i);
  expect(summary).toBeVisible();
});

test("renders default image when image is not defined", () => {
  render(<Episode episode={episodePropsWithNoImg} />);

  const imageAlt = screen.queryByAltText("https://i.ibb.co/2FsfXqM/stranger-things.png");
  //   console.log("imageAlt:", imageAlt.alt);
  expect(imageAlt).toBeInTheDocument();
});
