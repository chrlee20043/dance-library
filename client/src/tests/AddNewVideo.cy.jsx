import React from "react";
import { BrowserRouter } from "react-router-dom";
import AddNewVideo from "../components/AddNewVideo";
import { VideosContextProvider } from "../context/VideosContext";

describe("<AddNewVideo />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AddNewVideo />
        </VideosContextProvider>
      </BrowserRouter>
    );
  });

  it("checks that there is an h4 with text Add New Video Class", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AddNewVideo />
        </VideosContextProvider>
      </BrowserRouter>
    );
    // getting the h4 with a "querySelector"
    // checking that it says Add New Video Class
    cy.get("h4").contains("Add New Video Class");
  });
  it("Instructor name input should accept typing", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AddNewVideo />
        </VideosContextProvider>
      </BrowserRouter>
    );
    const typedVal = "Karen";
    cy.get("#instructor-name").type(typedVal).should("have.value", typedVal);
  });

  it("style input should accept typing", () => {
    //   // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AddNewVideo />
        </VideosContextProvider>
      </BrowserRouter>
    );
    const typedVal = "contemporary";
    cy.get("#style").type(typedVal).should("have.value", typedVal);
  });

  it("button should be clickable", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AddNewVideo />
        </VideosContextProvider>
      </BrowserRouter>
    );
    cy.get(".card-button").click();
  });
});
