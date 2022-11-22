import React from 'react';
import {Route, Routes} from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import NavMenu from "./components/NavMenu/NavMenu";
import Navbar from "react-bootstrap/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './components/NavBar'
import Pathing from "./components/Path";
import LobbyPage from "./pages/Lobby";

function App() {

  return (
      <div>
          <Nav/>
          <Pathing/>
      </div>
  );
}

export default App;
