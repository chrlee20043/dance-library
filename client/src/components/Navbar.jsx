import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="navbar">
      <h1 id="navbar-title">My Dance Studio</h1>
      <div id="navbar-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/myprofile/:id">Profile</Link>
          </li>
          <li>
            <Link to="/allvideos">Browse Classes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
