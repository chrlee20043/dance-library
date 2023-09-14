import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ token }) {
  return (
    <div id="navbar">
      <h1 id="navbar-title">My Dance Studio</h1>
      <nav>
        <div id="navbar-links">
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/myprofile">PROFILE</Link>
            </li>
            <li>{token && <Link to="/allvideos">CLASSES</Link>}</li>
            <li>
              {token ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
