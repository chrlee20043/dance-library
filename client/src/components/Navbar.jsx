import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../Redux/authSlice";
import { resetFavorites } from "../Redux/favoriteSlice";

// MUI IMPORTS
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onLogout = () => {
    dispatch(logOut());
    dispatch(resetFavorites());
    navigate("/login");
    console.log("logout token:", props.token);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        background: "rgb(219, 206, 219)",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{ my: 2, color: "white", fontWeight: "bold", fontSize: "22px" }}
      >
        MY DANCE LIBRARY
      </Typography>
      <Divider />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ListItemButton
          sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
          color="inherit"
          component={Link}
          to="/"
        >
          HOME
        </ListItemButton>
        {props.token && (
          <ListItemButton
            sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
            color="inherit"
            fontWeight="bold"
            component={Link}
            to="/myprofile"
          >
            PROFILE
          </ListItemButton>
        )}
        <ListItemButton
          sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
          color="inherit"
          fontWeight="bold"
          component={Link}
          to="/allvideos"
        >
          CLASSES
        </ListItemButton>
        {props.token ? (
          <ListItemButton
            sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
            color="inherit"
            fontWeight="bold"
            onClick={onLogout}
          >
            LOG OUT
          </ListItemButton>
        ) : (
          <ListItemButton
            sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
            color="inherit"
            fontWeight="bold"
            component={Link}
            to="/login"
          >
            LOGIN
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ background: "rgb(219, 206, 219)" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                fontWeight: "bold",
              }}
            >
              MY DANCE LIBRARY
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <List
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <ListItemButton
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                  color="inherit"
                  component={Link}
                  to="/"
                >
                  HOME
                </ListItemButton>
                {props.token && (
                  <ListItemButton
                    sx={{ fontSize: "20px", fontWeight: "bold" }}
                    color="inherit"
                    component={Link}
                    to="/myprofile"
                  >
                    PROFILE
                  </ListItemButton>
                )}
                <ListItemButton
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                  color="inherit"
                  component={Link}
                  to="/allvideos"
                >
                  CLASSES
                </ListItemButton>
                {props.token ? (
                  <ListItemButton
                    sx={{ fontSize: "20px", fontWeight: "bold" }}
                    color="inherit"
                    onClick={onLogout}
                  >
                    LOG OUT
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    sx={{ fontSize: "20px", fontWeight: "bold" }}
                    color="inherit"
                    component={Link}
                    to="/login"
                  >
                    LOGIN
                  </ListItemButton>
                )}
              </List>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              background: "rgb(219, 206, 219)",
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Typography></Typography>
        </Box>
      </Box>
    </>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
  token: PropTypes.string,
};

export default DrawerAppBar;
