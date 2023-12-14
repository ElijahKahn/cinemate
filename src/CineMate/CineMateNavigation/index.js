import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./index.css";
import CineMateLogo from "./CineMateLogo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as client from "../users/client"


const pages = ["Home", "Movies", "Series", "Search"];
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [account, setAccount] = useState(null);
  const settings = account ?
    ["Profile", "My Watchlist", "Logout"] :
    ["Profile", "My Watchlist", "Sign In"];
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [content, setContent] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();




  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchData = async () => {
    if (query) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmY1NzY2NDA0ZTU0YWMzNDgzZjYxZDBhMWM1ZDdhOSIsInN1YiI6IjY1NmZiZTViMDg1OWI0MDEzOTUzODAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2M0pjPB1EGZmw0B24LvOGHC6s-m5qOukOYon6xsg8A'
        }
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
          options
        );
        const responseData = await response.json();
        setContent(responseData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(true);
    fetchData();
    setSearchParams({ criteria: query });
    navigate(`/CineMate/Search?criteria=${encodeURIComponent(query)}`)
  };

  useEffect(() => {
    if (searched) {
      fetchData();
    }
  });

  const fetchAccount = async () => {
    try {
      const account = await client.account();
      setAccount(account);
    } catch (error) {
      console.error("error fetching", error);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);



  const signout = async () => {
    await client.signout();
    navigate("/CineMate/SignIn");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);

  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === 'Sign In') {
      navigate('/CineMate/SignIn');
    }

    if (setting === 'Profile') {
      account ? (
        navigate('/CineMate/Profile')
      ) : (
        alert("Must sign in to access your profile")
      )
    };

    if (setting === 'My Watchlist') {
      account ? (
        navigate('/CineMate/Watchlist')
      ) : (
        alert("Must sign in to access your watchlist")
      )
    };

    if (setting == "Logout") {
      signout();
    }
  };



  return (
    <div className="main-nav">
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.20)" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/CineMate/Home">
              <img
                src={CineMateLogo}
                alt="CineMate Logo"
                style={{ height: "40px", marginRight: "8px" }}
              />

            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link
                    key={page}
                    to={`/CineMate/${page}`}
                    className={`nav-link ${pathname.includes(page) && "active"
                      }`}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page}
                  to={`/CineMate/${page}`}
                  className={`nav-link ${pathname.includes(page) && "active"}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontWeight: 1000,
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>


            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
         
{
  account ? (
    <Avatar alt={account.firstName || 'Avatar'}>
      {account.firstName ? account.firstName[0] : ''}
    </Avatar>
  ) : (
    <Avatar alt="Avatar" src="/static/images/avatar/2.jpg">
      {'P'}
    </Avatar>
  )
}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
