import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile";
import AllVideos from "./components/AllVideos";
import SingleVideo from "./components/SingleVideo";
import AddNewVideo from "./components/AddNewVideo";
import UpdateVideo from "./components/UpdateVideo";
import Register from "./components/Register";
import Login from "./components/Login";
import { VideosContextProvider } from "./context/VideosContext";

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
            <Route path="/allvideos/:id" element={<SingleVideo />} />
            <Route
              path="/allvideos/:id/updatevideo"
              element={<UpdateVideo />}
            />
            <Route path="/addnewvideo" element={<AddNewVideo />} />
          </Routes>
        </div>
      </VideosContextProvider>
    </>
  );
}

export default App;
