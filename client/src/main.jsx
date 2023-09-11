import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { VideosContextProvider } from "./context/VideosContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <VideosContextProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </VideosContextProvider> */}
  </React.StrictMode>
);
