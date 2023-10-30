import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-text">Welcome to your personal dance library!</h1>
        <h3 className="home-text">
          Train with your favorite instructors, learn a new style, and gain new
          skills!
        </h3>
        <p>
          <button onClick={handleRegister} className="home-page-button">
            Create an Account
          </button>
        </p>
      </div>
    </div>
  );
}
