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
import Logout from "./components/Logout";
import { VideosContextProvider } from "./context/VideosContext";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  localStorage.setItem("token", token);

  return (
    <>
      <VideosContextProvider>
        <Navbar token={token} />
        <Routes>
          {/* <div className="main-container"> */}
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <Register
                setToken={setToken}
                userId={userId}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setToken={setToken}
                userId={userId}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="/logout"
            element={<Logout setToken={setToken} userId={userId} />}
          />
          <Route
            path="/myprofile"
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
