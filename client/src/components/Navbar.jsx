import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../Redux/authSlice";
import { resetFavorites } from "../Redux/favoriteSlice";

export default function Navbar({ token }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOut());
    dispatch(resetFavorites());
    navigate("/login");
    console.log("logout token:", token);
  };

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
                <button className="auth-btn" onClick={onLogout}>
                  LOG OUT
                </button>
              ) : (
                <Link to="/login">LOGIN</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
