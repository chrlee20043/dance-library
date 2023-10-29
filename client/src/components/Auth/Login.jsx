import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/authSlice";
import { loginToAccount } from "../../helpers/fetching";
import { fetchFavoritesByUserId } from "../../helpers/fetching";
import { setFavorites } from "../../Redux/favoriteSlice";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const userInfo = {
      username,
      password,
    };

    try {
      const response = await loginToAccount(
        userInfo.username,
        userInfo.password
      );
      console.log("logged in user:", response);
      if (response) {
        dispatch(
          setCredentials({
            username: response.user.username,
            userId: response.user.user_id,
            token: response.token,
            isLoggedIn: true,
          })
        );
        const myFavorites = await fetchFavoritesByUserId(response.user.user_id);

        dispatch(setFavorites(myFavorites));
        setSuccessMessage("You have logged in.");
        setUsername("");
        setPassword("");
        navigate(`/myprofile`);
      } else {
        console.error("error", error);
        setError("Incorrect credentials. Please try again.");
      }
    } catch (error) {
      setError("Invalid username or password. Please try again.");
      throw error;
    }
  };
  const textFieldSX = {
    margin: 2,
    width: "80%",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid rgb(255, 123, 0)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
  };

  const loginBtnSX = {
    ml: 1,
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

  const registerBtnSX = {
    marginTop: 1,
    color: "black",
    "&:hover": {
      borderBottom: "2px solid rgb(255, 123, 0)",
      borderRadius: 0,
      backgroundColor: "white",
    },
  };

  const alertSX = {
    backgroundColor: "rgba(255, 123, 0, 0.1)",
    border: "1px solid rgba(255, 123, 0, 0.5)",
    borderRadius: "4px",
    padding: "8px",
    marginBottom: "10px",
  };

  return (
    <Grid
      container
      justifyContent="center"
      padding="10px"
      margin="3"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h4">Login</Typography>
          {error && (
            <Alert severity="error" sx={alertSX}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              type="text"
              variant="outlined"
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={textFieldSX}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={textFieldSX}
            />
            <Button type="submit" variant="contained" sx={loginBtnSX}>
              Log in
            </Button>
          </form>
          <Button
            variant="text"
            onClick={() => navigate("/register")}
            sx={registerBtnSX}
          >
            Don't have an account? Register here.
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
