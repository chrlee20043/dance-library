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

  const handleLogin = (event) => {
    console.log("log in");
    event.preventDefault();
    async function loggingInUser() {
      const userInfo = {
        username,
        password,
      };
      try {
        const loginData = await loginToAccount(
          userInfo.username,
          userInfo.password
        );
        console.log("logged in user:", loginData);

        if (loginData && loginData.success) {
          setSuccessMessage(true);
          setUsername("");
          setPassword("");
          // navigate(`/myprofile/${id}`);
        } else {
          setSuccessMessage("");
          setError("Please try again or register for an account");
          console.log("need to register");
        }
        return loginData;
      } catch (error) {
        console.error(error);
      }
    }
    loggingInUser();
  };

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
        <button className="form-button" type="submit">
          Log in
        </button>
      </form>
      <button
        type="button"
        className="link-button"
        onClick={() => navigate("/register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
}
