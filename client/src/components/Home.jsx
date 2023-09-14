import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  // const handleLogin = () => {
  //   navigate("/login");
  // };

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
        <button onClick={handleRegister} className="home-page-button">
          Register
        </button>
        {/* or{" "}
        <button onClick={handleLogin} className="home-page-button">
          Login
        </button> */}
      </p>
    </div>
  );
}
