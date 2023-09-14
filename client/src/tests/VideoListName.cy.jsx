import React from "react";
import { BrowserRouter } from "react-router-dom";
import { VideosContextProvider } from "../context/VideosContext";
import AllVideos from "../components/AllVideos";
import VideoListName from "../components/VideoListName";

describe("<VideoListName />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AllVideos>
            <VideoListName />
          </AllVideos>
        </VideosContextProvider>
      </BrowserRouter>
    );
  });

  it("checks that there is a p with text Style", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AllVideos>
            <VideoListName />
          </AllVideos>
        </VideosContextProvider>
      </BrowserRouter>
    );

    // getting the h2 with a "querySelector"
    // checking that it says Login
    cy.get("p").contains("Style");
  });

  it("button should be clickable", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <VideosContextProvider>
          <AllVideos>
            <VideoListName />
          </AllVideos>
        </VideosContextProvider>
      </BrowserRouter>
    );

    cy.get(".card-button").click();
  });
});
