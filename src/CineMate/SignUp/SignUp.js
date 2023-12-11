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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import CineMateLogo from "../../CineMate/CineMateNavigation/CineMateLogo.png";
import CineMateNavigation from "../../CineMate/CineMateNavigation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "../users/client.js";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function SignUp() {

  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", password: "" });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/CineMate/Profile");
    } catch (err) {
      setError(err.response.data.message);
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
              Sign up
            </Typography>
            {error && <div>{error}</div>}
            <Box
              component="form"
              noValidate
              onSubmit={signup}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={credentials.firstName}
                    onChange={(e) => setCredentials({
                      ...credentials,
                      firstName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={credentials.lastName}
                    onChange={(e) => setCredentials({
                      ...credentials,
                      lastName: e.target.value })}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({
                      ...credentials,
                      email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    name="userName"
                    autoComplete="Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({
                      ...credentials,
                      username: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value })}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="user-role"
                      name="userRole"
                      defaultValue="userRole"
                      row
                    >
                      <FormControlLabel
                        value="userRole"
                        control={<Radio color="primary" />}
                        label={
                          <Typography style={{ color: "black" }}>
                            User
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="adminRole"
                        control={<Radio color="primary" />}
                        label={
                          <Typography style={{ color: "black" }}>
                            Admin
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signup}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/CineMate/SignIn" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
}
