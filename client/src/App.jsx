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

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
    setUserId(window.localStorage.getItem("userId"));
    const storedToken = window.localStorage.getItem("token");
    const storedUserId = window.localStorage.getItem("userId");
    setToken(storedToken);
    setUserId(storedUserId);
    console.log("storage id: ", userId);
  }, []);

  return (
    <>
      <VideosContextProvider>
        <Navbar token={token} />
        <Routes>
          {/* <div className="main-container"> */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route
            path="/myprofile/:userId"
            element={
              <Profile token={token} setToken={setToken} userId={userId} />
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
