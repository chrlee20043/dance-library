import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile";
import AllVideos from "./components/AllVideos";
import SingleVideo from "./components/SingleVideo";
import UpdateVideo from "./components/UpdateVideo";
import Register from "./components/Register";
import Login from "./components/Login";
import { VideosContextProvider } from "./context/VideosContext";
import AddNewVideo from "./components/AddNewVideo";
import EditVideo from "./components/EditVideo";

function App() {
  return (
    <>
      <VideosContextProvider>
        <div>
          <Navbar />
        </div>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<Profile />} />
            <Route path="/allvideos" element={<AllVideos />} />
            <Route path="/allvideos/:videoId" element={<SingleVideo />} />

            <Route path="/allvideos/:videoId/update" element={<EditVideo />} />
          </Routes>
        </div>
      </VideosContextProvider>
    </>
  );
}

export default App;
