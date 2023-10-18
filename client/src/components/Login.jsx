import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/authslice";
import { loginToAccount } from "../helpers/fetching";

// MUI IMPORTS

// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Login({ setToken, token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const defaultTheme = createTheme();

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

  return (
    // <ThemeProvider theme={defaultTheme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Sign in
    //       </Typography>
    //       <Box
    //         component="form"
    //         onSubmit={handleLogin}
    //         noValidate
    //         sx={{ mt: 1 }}
    //       >
    //         <TextField
    //           onChange={(e) => setUsername(e.target.value)}
    //           type="text"
    //           placeholder="Username"
    //           id="username"
    //           name="username"
    //           margin="normal"
    //           label="username"
    //           autoComplete="username"
    //           value={username}
    //           fullWidth
    //           autoFocus
    //           required
    //         />
    //         <TextField
    //           onChange={(e) => setPassword(e.target.value)}
    //           type="password"
    //           placeholder="********"
    //           id="password"
    //           name="password"
    //           margin="normal"
    //           label="Password"
    //           autoComplete="current-password"
    //           value={password}
    //           fullWidth
    //           required
    //         />
    //         <FormControlLabel
    //           control={<Checkbox value="remember" color="primary" />}
    //           label="Remember me"
    //         />
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           Sign In
    //         </Button>
    //         <Grid container>
    //           <Grid item xs>
    //             <Link href="#" variant="body2">
    //               Forgot password?
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             <Link href="#" variant="body2">
    //               {"Don't have an account? Sign Up"}
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //     {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    //   </Container>
    // </ThemeProvider>
    //   );
    // }
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
