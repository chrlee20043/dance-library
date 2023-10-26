import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/authSlice";
import { setFavorites } from "../../Redux/favoriteSlice";
import { createUser, fetchFavoritesByUserId } from "../../helpers/fetching";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Link as MuiLink,
} from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const register = await createUser(username, password, name);

      if (register) {
        dispatch(
          setCredentials({
            username: register.user.username,
            userId: register.user.user_id,
            token: register.token,
            isLoggedIn: false,
          })
        );
        const myFavorites = await fetchFavoritesByUserId(register.user.user_id);

        dispatch(setFavorites(myFavorites));
        setName("");
        setUsername("");
        setPassword("");
        setSuccessMessage("Yay, you are signed up!");
        navigate("/login");
      }
    } catch (error) {
      setError("Please provide valid credentials");
      console.error(error);
    }
  }

  const textFieldSX = {
    margin: "5px",
    width: "100%",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid rgb(255, 123, 0)",
      borderColor: "rgb(255, 123, 0)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
  };

  const registerBtnSX = {
    backgroundColor: "rgb(219, 206, 219)",
    border: "1px solid rgb(219, 206, 219) ",
    marginTop: "2",
    color: "black",
    "&:hover": {
      backgroundColor: "rgb(219, 206, 219)",
      border: "2px solid rgb(255, 123, 0) ",
    },
    "&.MuiButtonBase-root.MuiButton-clicked": {
      backgroundColor: "white",
    },
  };

  const loginBtnSX = {
    marginTop: 1,
    color: "black",
    "&:hover": {
      borderBottom: "2px solid rgb(255, 123, 0)",
      borderRadius: 0,
      backgroundColor: "white",
    },
  };

  return (
    <Grid
      container
      justifyContent="center"
      padding="10px"
      margin="3"
      // alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5">Create an Account</Typography>
            {successMessage && (
              <div>
                <Typography>{successMessage}</Typography>
                <MuiLink component={Link} to="/login">
                  Log in
                </MuiLink>
              </div>
            )}
            <TextField
              label="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              size="small"
              sx={textFieldSX}
              required
              margin="normal"
            />
            <TextField
              label="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              size="small"
              sx={textFieldSX}
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              size="small"
              sx={textFieldSX}
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" sx={registerBtnSX}>
              Register
            </Button>
          </form>
          <Button
            variant="text"
            onClick={() => navigate("/login")}
            sx={loginBtnSX}
          >
            Already have an account? Login here.
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
