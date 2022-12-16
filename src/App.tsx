import React, {useState, useEffect, useCallback} from "react";
import {gameInfo, Gaming} from "./components/Canvas";
import io from "socket.io-client";
import {wait} from "@testing-library/user-event/dist/utils";


function App() {
    let done;
    let test:gameInfo;
    let game = new Gaming(1000,1000);
    return game.Canvas();
}

export default App;