import {Gaming} from "./components/Canvas";
import React from "react";

function App() {
    console.log('test');
    let game = new Gaming(1000,1000);

    const addLobby = () => {
        game.socket.emit('CreateLobby', (data:any) => {
            console.log(data);
        });
    }
    const joinLobby = () => {
        game.socket.emit('JoinLobby', (data:any) => {
            console.log(data);
        });
    }
    const leaveLobby = () => {
        game.socket.emit('LeaveLobby', (data:any) => {
            console.log(data);
        });
    }
    const printLobby = () => {
        game.socket.emit('LobbyInfo', (data:any) => {
            console.log(data);
        });
    }

    return (
        <div>
            <button onClick={addLobby}> ADD LOBBY </button>
            <button onClick={joinLobby}> JOIN LOBBY </button>
            <button onClick={leaveLobby}> LEAVE LOBBY </button>
            <button onClick={printLobby}> PRINT LOBBY INFO </button>
        </div>);
    //return game.Canvas();
}

export default App;