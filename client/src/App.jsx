import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile";
import AllVideos from "./components/AllVideos";
import SingleVideo from "./components/SingleVideo";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { VideosContextProvider } from "./context/VideosContext";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUserId,
  selectCurrentUsername,
} from "./Redux/authslice";

function App() {
  const token = useSelector(selectCurrentToken);
  const userId = useSelector(selectCurrentUserId);
  const currentUsername = useSelector(selectCurrentUsername);

  return (
    <>
      <VideosContextProvider>
        <Navbar token={token} />
        <Routes>
          {/* <div className="main-container"> */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/myprofile"
            element={
              <Profile
                token={token}
                userId={userId}
                currentUser={currentUsername}
              />
            }
          />
          <Route
            path="/allvideos"
            element={<AllVideos token={token} userId={userId} />}
          />
          <Route
            path="/allvideos/:videoId"
            element={<SingleVideo token={token} userId={userId} />}
          />
          {/* </div> */}
        </Routes>
      </VideosContextProvider>
    </>
  );
}

export default App;
