import React from "react";
// import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AllVideos from "../components/AllVideos";
import { VideosContextProvider } from "../context/VideosContext";

describe("<AllVideos />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AllVideos />
        </VideosContextProvider>
      </BrowserRouter>
    );
  });

  it("checks that there is an h1 with text Classes", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AllVideos />
        </VideosContextProvider>
      </BrowserRouter>
    );

    // getting the h1 with a "querySelector"
    // checking that it says Login
    cy.get("h1").contains("Classes");
  });

  it("search input should accept typing", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AllVideos />
        </VideosContextProvider>
      </BrowserRouter>
    );
    const typedVal = "beginner";
    cy.get("#search-input").type(typedVal).should("have.value", typedVal);
  });
});
