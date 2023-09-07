import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to your personal dance studio!</h1>
      <p>
        Take classes from your favorite instructors, learn a new style, and
        learn new skills!
      </p>
      <p>
        <Link to="/login">Login</Link> or <Link to="register">Register</Link>
      </p>
    </div>
  );
}
