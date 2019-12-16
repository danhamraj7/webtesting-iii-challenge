import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
//
import Controls from "./Controls";

test("renders without crashing", () => {
  render(<Controls />);
});

//unlock and open
test("unlocked and open", () => {
  const toggleClosed = jest.fn();
  const { getByText } = render(
    <Controls locked={false} closed={false} toggleClosed={toggleClosed} />
  );
  const lockBtn = getByText(/lock gate/i);
  const closeBtn = getByText(/close gate/i);

  expect(lockBtn.disabled).toBe(true);
  expect(closeBtn.disabled).toBe(false);

  fireEvent.click(closeBtn);
  expect(toggleClosed).toBeCalled();
});

//unlock and close
test("unlocked and close", () => {
  const toggleOpen = jest.fn();
  const toggleLock = jest.fn();
  const { getByText } = render(
    <Controls
      locked={false}
      closed={true}
      toggleClosed={toggleOpen}
      toggleLocked={toggleLock}
    />
  );

  const lockBtn = getByText(/lock gate/i);
  const openBtn = getByText(/open gate/i);

  expect(lockBtn.disabled).toBe(false);
  expect(openBtn.disabled).toBe(false);

  fireEvent.click(lockBtn);
  expect(toggleLock).toBeCalled();

  fireEvent.click(openBtn);
  expect(toggleOpen).toBeCalled();
});

//locked and closed
test("locked and close", () => {
  const toggleUnLock = jest.fn();
  const { getByText } = render(
    <Controls locked={true} closed={true} toggleLocked={toggleUnLock} />
  );

  const unlockBtn = getByText(/unlock gate/i);
  const openBtn = getByText(/open gate/i);

  expect(unlockBtn.disabled).toBe(false);
  expect(openBtn.disabled).toBe(true);

  fireEvent.click(unlockBtn);
  expect(toggleUnLock).toBeCalled();
});
