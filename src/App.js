import "./App.css";
import CineMate from "./CineMate";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./CineMate/Home";
import Search from "./CineMate/Search";
import Movies from "./CineMate/Movies/Movies";
import Series from "./CineMate/Series/Series";
import Details from "./CineMate/MovieDetails/Details";
import SignIn from "./CineMate/users/SignIn";
import SignUp from "./CineMate/users/SignUp";
import Profile from "./CineMate/users/Profile/Profile";
import Watchlist from "./CineMate/Watchlist/Watchlist";
import UserTable from "./CineMate/users/table";
import OtherUserProfile from "./CineMate/OtherUser/OtherUserProfile";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} exact/>
          <Route path="/CineMate/Home" element={<Home />}  />
          <Route path="/CineMate/Movies" element={<Movies/>}  />
          <Route path="/CineMate/Series" element={<Series/>}  />
          <Route path="/CineMate/*" element={<CineMate />} />
          <Route path="/CineMate/Search/" element={<Search />} />
          <Route path="/CineMate/Home/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Movies/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Series/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Search/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Watchlist/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Profile/:userId/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Profile/Details/:media_type/:id" element={<Details />} />
          <Route path="/CineMate/Signin" element={<SignIn />} />
          <Route path="/CineMate/Signup" element={<SignUp />} />
          <Route path="/CineMate/Profile" element={<Profile />} />
          <Route path="/CineMate/Profile/:userId" element={<OtherUserProfile />} />
          <Route path="/CineMate/Watchlist" element={<Watchlist />} />
          <Route path="/CineMate/Profile/Admin/Users" element={<UserTable />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
