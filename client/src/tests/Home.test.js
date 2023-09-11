/**
 * @jest-environment jsdom
 */

// Jest Testing

// Import necessary dependencies and extend expect matchers
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Import component to be tested

import Home from "../components/Home";

// Home Page

//where are we testing
describe("rendering Home component", () => {
  // what are we testing
  test("displays Welcome message", () => {
    render(<Home />);
    // checking the jest-environment browser window for the string 'Welcome'
    const welcome = screen.getByText("Welcome");

    // what do we expect to see
    expect(welcome).toBeInTheDocument();
    // expect(screen.getByText(/welcome`/i)).toBeInTheDocument;
  });
});

// When user clicks on register button, the register component renders

// When user clicks on login button, the login component renders

//// Test: button click increments the count
// User interaction test
// describe("User interaction", () => {
//   test("button click increments the count", () => {
//     //render app component and finding button
//     const { getByText } = render(<AllPosts />);
//     const button = getByText("count is 0");

//     //simulate a click
//     fireEvent.click(button);

//     expect(button.textContent).toBe("count is 1");
//   });
//   test("multiple button clicks update the button text", () => {
//     //render app component and finding button
//     const { getByText } = render(<AllPosts />);
//     const button = getByText("count is 0");

//     //Click 3 times
//     fireEvent.click(button);
//     fireEvent.click(button);
//     fireEvent.click(button);

//     expect(button.textContent).toBe("count is 3");
//   });
// });
