import React from "react";
import { render } from "@testing-library/react";
import { login as loginMock } from "./api";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("./api.js", () => ({
  login: jest.fn(() => {
    return new Promise(
      resolve => setTimeout(() => resolve({ message: "Success" })),
      10
    );
  })
}));

afterEach(() => loginMock.mockClear());

async function logsIn({ getByLabelText, getByText }) {
  const emailField = getByLabelText("Email");
  const passwordField = getByLabelText("Password");
  const submitButton = getByText("Submit");

  userEvent.type(emailField, "julio@able.co");
  userEvent.type(passwordField, "ableable");
  userEvent.click(submitButton);
}

test("logs in user", async () => {
  const utils = render(<App />);
  await logsIn(utils);
  const { getByText, getByAltText, findByText } = utils;

  // Assertions
  getByText("Loading...");
  await findByText(/you are logged in/i);
  getByAltText("celebrating dog");
  getByText(/log out/i);
});

test("logs out user", async () => {
  const utils = render(<App />);
  await logsIn(utils);

  const logOutButton = await utils.findByText(/log out/i);
  userEvent.click(logOutButton);

  // Assertions
  utils.getByText("Log Into My Account");
});

test("calls API with correct data", async () => {
  const utils = render(<App />);
  await logsIn(utils);

  const logOutButton = await utils.findByText(/log out/i);
  expect(loginMock).toHaveBeenCalled();
  expect(loginMock).toHaveBeenCalledTimes(1);
  expect(loginMock).toHaveBeenCalledWith("julio@able.co", "ableable");
  expect(loginMock).toHaveBeenCalledWith("julio@able.co", "ableable");
});

test("calls onLoggedIn after user logs in", async () => {
  const mockLoggedIn = jest.fn();
  const utils = render(<App onLoggedIn={mockLoggedIn} />);
  await logsIn(utils);
  const logOutButton = await utils.findByText(/log out/i);
  expect(mockLoggedIn).toHaveBeenCalled();
});

test("calls onChange when changes", () => {
  mock;
  onChange;
});
