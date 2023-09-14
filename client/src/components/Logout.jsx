import React from "react";
import Login from "./Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../helpers/fetching";

export default function Logout({ setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser();
    setToken(null);
  });

  return <Login />;
}
