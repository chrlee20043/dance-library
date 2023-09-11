import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to your personal dance studio!</h1>
      <p>
        Train with your favorite instructors, learn a new style, and gain new
        skills!
      </p>
      <p>
        {/* <Register />
        <Login /> */}
        <Link to="register">
          <button className="home-page-button">Register</button>
        </Link>{" "}
        or{" "}
        <Link to="/login">
          <button className="home-page-button">Login</button>
        </Link>
      </p>
    </div>
  );
}
