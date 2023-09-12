import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile";
import AllVideos from "./components/AllVideos";
import SingleVideo from "./components/SingleVideo";
import Register from "./components/Register";
import Login from "./components/Login";
import { VideosContextProvider } from "./context/VideosContext";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <VideosContextProvider>
        <Navbar />
        <Routes>
          {/* <div className="main-container"> */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/myprofile" element={<Profile token={token} />} />
          <Route path="/allvideos" element={<AllVideos token={token} />} />
          <Route
            path="/allvideos/:videoId"
            element={<SingleVideo token={token} />}
          />
          {/* </div> */}
        </Routes>
      </VideosContextProvider>
    </>
  );
}

export default App;
