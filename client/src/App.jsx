import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Auth/Home.jsx";
import Navbar from "./components/Navigation/Navbar.jsx";
import Profile from "./components/Auth/Profile";
import AllVideos from "./components/Videos/AllVideos";
import SingleVideo from "./components/Videos/SingleVideo";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import AllInstructors from "./components/Instructors/AllInstructors";
import SingleInstructor from "./components/Instructors/SingleInstructor";
import { VideosContextProvider } from "./context/VideosContext";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUserId,
  selectCurrentUsername,
} from "./Redux/authSlice";

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
          <Route
            path="/instructors"
            element={<AllInstructors token={token} userId={userId} />}
          />
          <Route
            path="/instructors/:instructorId"
            element={<SingleInstructor token={token} userId={userId} />}
          />
        </Routes>
      </VideosContextProvider>
    </>
  );
}

export default App;
