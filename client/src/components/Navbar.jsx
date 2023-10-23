import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../Redux/authSlice";
import { resetFavorites } from "../Redux/favoriteSlice";

/* MUI IMPORTS */
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function Navbar({ token }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOut());
    dispatch(resetFavorites());
    navigate("/login");
    console.log("logout token:", token);
  };

  const NavbarContainer = styled(AppBar)({
    background: "rgb(219, 206, 219)",
  });

  const NavbarTitle = styled(Typography)({
    flexGrow: 1,
  });

  const NavbarLinks = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  return (
    <NavbarContainer position="static">
      <Toolbar>
        <NavbarTitle variant="h6" component="div">
          My Dance Library
        </NavbarTitle>
        <NavbarLinks>
          <Button color="inherit" component={Link} to="/">
            HOME
          </Button>
          {token && (
            <Button color="inherit" component={Link} to="/myprofile">
              PROFILE
            </Button>
          )}
          <Button color="inherit" component={Link} to="/allvideos">
            CLASSES
          </Button>

          {token ? (
            <Button color="inherit" onClick={onLogout}>
              LOG OUT
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              LOGIN
            </Button>
          )}
        </NavbarLinks>
      </Toolbar>
    </NavbarContainer>
  );
}
