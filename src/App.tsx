import React from 'react';
import {Route, Routes} from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Game from "./pages/Game";

function App() {

  return (
      <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Leaderboard' element={<Leaderboard/>}/>
            <Route path='/Settings' element={<Settings/>}/>
            <Route path='/Game' element={<Game/>}/>
        </Routes>
      </div>
  );
}

export default App;
