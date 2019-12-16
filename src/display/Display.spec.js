import React from "react";
import { render } from "@testing-library/react";

import Display from "./Display";

test("renders without correctly", () => {
  render(<Display />);
});

//snapshot
test("should match snapshot", () => {
  expect(render(<Display />)).toMatchSnapshot();
});

// unlocked and open
test("unlocked and open", () => {
  const { getByText } = render(<Display />);
  const open = getByText(/open/i);
  const unlocked = getByText(/unlocked/i);

  expect(open.className).toMatch(/green-led/i);
  expect(unlocked.className).toMatch(/green-led/i);
});

//unlocked and closed
test("unlocked and closed", () => {
  const { getByText } = render(<Display closed={true} locked={false} />);

  const close = getByText(/closed/i);
  const unlock = getByText(/unlocked/i);

  expect(close.className).toMatch(/red-led/i);
  expect(unlock.className).toMatch(/green-led/i);
});

// locked and closed
test("locked and closed", () => {
  const { getByText } = render(<Display closed={true} locked={true} />);

  const close = getByText(/closed/i);
  const lock = getByText(/locked/i);

  expect(close.className).toMatch(/red-led/i);
  expect(lock.className).toMatch(/red-led/i);
});
