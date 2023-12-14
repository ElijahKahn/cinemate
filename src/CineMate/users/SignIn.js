import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import CineMateLogo from "../../CineMate/CineMateNavigation/CineMateLogo.png";
import CineMateNavigation from "../CineMateNavigation";
import { useState } from "react";
import * as client from "./client.js";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // Add state for error message

  const navigate = useNavigate();
  const signin = async (event) => {
    event.preventDefault();
    try {
      const response = await client.signin(credentials);

      if (response && response.username) {
        navigate("/CineMate/Profile");
      } else {
        // Set an error message if sign-in fails
        setError("Invalid username or password");
      }
    } catch (err) {
      // Set a more generic error message on network error or server issue
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <>
      <CineMateNavigation />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={CineMateLogo}
              alt="CineMate Logo"
              style={{ height: "90px", margin: "20px" }}
            />
            <Typography style={{ color: "black" }} component="h1" variant="h4">
              Sign in
            </Typography>
            <Box component="form" onSubmit={signin} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                type="password"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={
                  <Typography style={{ color: "black" }}>
                    Remember me
                  </Typography>
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/CineMate/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
}
