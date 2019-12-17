import React from "react";
import { render, fireEvent } from "@testing-library/react";
//
import Dashboard from "./Dashboard";

// component renders correctly
test("Dashboard renders correctly", () => {
  render(<Dashboard />);
});

//snapshot
test("should match snapshot", () => {
  expect(render(<Dashboard />)).toMatchSnapshot();
});

// same test for it shows controls and display
test("default state is unlocked and open", () => {
  const { getByText } = render(<Dashboard />);

  getByText(/unlocked/i);
  getByText(/open/i);

  const lockBtn = getByText(/lock gate/i);
  const closeBtn = getByText(/close gate/i);

  expect(lockBtn.disabled).toBe(true);
  expect(closeBtn.disabled).toBe(false);
});

// cannot be closed or open if it is locked
test("cannot be closed or opened if it it locked", () => {
  const { getByText } = render(<Dashboard />);

  const lockBtn = getByText(/lock gate/i);
  const closeBtn = getByText(/close gate/i);

  fireEvent.click(closeBtn);
  fireEvent.click(lockBtn);

  getByText(/locked/i);
  getByText(/closed/i);

  const openBtn = getByText(/open gate/i);
  const unlockBtn = getByText(/unlock gate/i);

  expect(openBtn).toBeTruthy();
  expect(openBtn.disabled).toBe(true);
  expect(unlockBtn.disabled).toBe(false);
});
