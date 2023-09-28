import React from "react";
import Login from "./Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../helpers/fetching";

export default function Logout({ setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    logoutUser();
    setToken(null);
    navigate("/login");
  });

  return (
    <>
      <p>You are logged out! </p>
    </>
  );
}
