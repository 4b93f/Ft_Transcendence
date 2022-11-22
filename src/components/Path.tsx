import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard";
import Profile from "../pages/Profile";
import Game from "../pages/Game";
import Lobby from "../pages/Lobby";


function Pathing(){
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Leaderboard' element={<Leaderboard/>}/>
            <Route path='/Profile' element={<Profile/>}/>
            <Route path='/Game' element={<Game/>}/>
            <Route path='/Lobby' element={<Lobby/>}/>
        </Routes>
    )
}
export default Pathing