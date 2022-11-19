import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard";
import Settings from "../pages/Settings";
import Game from "../pages/Game";


function Pathing(){
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Leaderboard' element={<Leaderboard/>}/>
            <Route path='/Settings' element={<Settings/>}/>
            <Route path='/Game' element={<Game/>}/>
        </Routes>
    )
}
export default Pathing