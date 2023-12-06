import "./App.css";
import CineMate from "./CineMate";

import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Home from "./CineMate/Home";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/CineMate/Home" element={<Home/>} exact />
          <Route path="/CineMate/*" element={<CineMate />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
