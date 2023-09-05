import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile";
import AllVideos from "./components/AllVideos";
import SingleVideo from "./components/SingleVideo";
import AddNewVideo from "./components/AddNewVideo";
import UpdateVideo from "./components/UpdateVideo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myprofile" element={<Profile />} />
        <Route path="/allvideos" element={<AllVideos />} />
        <Route path="/allvideos/:id" element={<SingleVideo />} />
        <Route path="/addnewvideo" element={<AddNewVideo />} />
        <Route path="/updatevideo" element={<UpdateVideo />} />
      </Routes>
    </>
  );
}

export default App;
