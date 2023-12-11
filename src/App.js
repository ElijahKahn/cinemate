import "./App.css";
import CineMate from "./CineMate";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./CineMate/Home";
import Search from "./CineMate/Search";
import Movies from "./CineMate/Movies/Movies";
import Series from "./CineMate/Series/Series";
import Details from "./CineMate/MovieDetails/Details";
import SignIn from "./CineMate/SignIn/SignIn";
import SignUp from "./CineMate/SignUp/SignUp";
import Profile from "./CineMate/Profile/Profile";
import Watchlist from "./CineMate/Watchlist/Watchlist";
import { GlobalProvider } from "./CineMate/context/GlobalState";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <GlobalProvider/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CineMate/Home" element={<Home />} exact />
          <Route path="/CineMate/Movies" element={<Movies/>}  />
          <Route path="/CineMate/Series" element={<Series/>}  />
          <Route path="/CineMate/*" element={<CineMate />} />
          <Route path="/CineMate/Search/" element={<Search />} />
          <Route path="/CineMate/Home/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Movies/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Series/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Search/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Signin" element={<SignIn />} />
          <Route path="/CineMate/Signup" element={<SignUp />} />
          <Route path="/CineMate/Profile" element={<Profile />} />
          <Route path="/CineMate/Profile/:id" element={<Profile />} />
          <Route path="/CineMate/Watchlist" element={<Watchlist />} />




        </Routes>
        <GlobalProvider/>
      </div>
    </HashRouter>
  );
}

export default App;
