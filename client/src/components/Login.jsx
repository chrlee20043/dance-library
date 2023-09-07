import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginToAccount } from "../helpers/fetching";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleLogin(event) {
    console.log("log in");
    event.preventDefault();
    try {
      const result = await loginToAccount({ username, password });
      console.log("logged in user:", result);

      if (result) {
        setSuccessMessage("You have logged in!");
        setError("");
        navigate("/profile");
      } else {
        setSuccessMessage("");
        setError("Please try again or register for an account");
        console.log("need to register");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <label className="label">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          required
        />
        <label className="label">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          required
        />
        <button type="submit">Log in</button>
      </form>
      <button
        type="button"
        className="link-btn"
        onClick={() => navigate("/register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
}
