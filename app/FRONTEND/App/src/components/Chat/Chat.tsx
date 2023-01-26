import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
// import AddGroup from "./AddGroup";
import GroupChat from './GroupChat';
import ListGroup from "./ListGroup";
import PopupGroup from './PopupGroup';


function Chat({socket, username}) {
    const [showPopUp, setShowPopUp] =  useState(false);
    const [showChat, setShowChat] =  useState(false);
    const [chatName, setChatName] =  useState("");


    const togglePopup = () => {
        setShowPopUp(!showPopUp)
    }

    const closeChat = () => {
        setShowPopUp(false)
        setShowChat(false)
    }

    const toggleChat = (room : string) => {
        setShowChat(!showChat)
        setChatName(room)
    }



    return (
        <div>
            {
                !showChat ?
                    showPopUp ? 
                    <PopupGroup socket={socket} username={username} handleclose={togglePopup}></PopupGroup>
                    :
                    <ListGroup socket={socket} username={username} handleclose={togglePopup} handlegroup={toggleChat}></ListGroup>
                :
                    <GroupChat socket={socket} username={username} room={chatName} handleclose={closeChat}></GroupChat>
            }

        </div>
    )
}
export default Chat;

