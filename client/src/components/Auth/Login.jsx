import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/authSlice";
import { loginToAccount } from "../../helpers/fetching";
import { Grid, Typography, TextField, Button, Paper } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    async function loggingInUser() {
      const userInfo = {
        username,
        password,
      };
      try {
        console.log(username);
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
        }
        setSuccessMessage("you have logged in");
        setUsername("");
        setPassword("");
        navigate(`/myprofile`);
      } catch (error) {
        console.error(error);
      }
    }
    loggingInUser();
  };

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

  const loginBtnSX = {
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
          <Typography variant="h4">Login</Typography>
          <Grid item xs={12}>
            <form onSubmit={handleLogin}>
              <TextField
                label="Username"
                type="text"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={textFieldSX}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={textFieldSX}
                required
              />
              <Button type="submit" variant="contained" sx={loginBtnSX}>
                Log in
              </Button>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="text"
              onClick={() => navigate("/register")}
              sx={registerBtnSX}
            >
              Don't have an account? Register here.
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
