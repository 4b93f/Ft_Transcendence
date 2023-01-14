import React, {useState, useEffect, useCallback} from "react";
import {gameInfo, Gaming} from "./components/Canvas";


function App() {
    let test:gameInfo;
    let game = new Gaming(1000,1000);
    return game.Canvas();
}

export default App;