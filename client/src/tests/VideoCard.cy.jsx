import React from "react";
import VideoCard from "../components/VideoCard";
import { BrowserRouter } from "react-router-dom";
import { VideosContextProvider } from "../context/VideosContext";

describe("<VideoCard />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <VideoCard />
        </VideosContextProvider>
      </BrowserRouter>
    );
  });

  it("checks that there is a p with text Style", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <VideoCard />
        </VideosContextProvider>
      </BrowserRouter>
    );

    //   // getting the h2 with a "querySelector"
    //   // checking that it says Login
    cy.get("p").contains("Style");
  });

  it("button should be clickable", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <VideoCard />
        </VideosContextProvider>
      </BrowserRouter>
    );

    cy.get(".card-button").click({ multiple: true });
  });
});
