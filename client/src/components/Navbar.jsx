import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="navbar">
      <h1 id="navbar-title">My Dance Studio</h1>
      <div id="navbar-links">
        <ul>
          <Link to="/">Home</Link>
          <Link to="/myprofile/:id">Profile</Link>
          <Link to="/allvideos">Browse Classes</Link>
        </ul>
      </div>
    </div>
  );
}
