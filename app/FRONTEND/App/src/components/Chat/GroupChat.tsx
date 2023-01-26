
import { CloseButton } from '@mantine/core';
import { useEffect, useState } from 'react';

function GroupChat({socket, username, room, handleclose}) {
    const [currentMessage, setCurrentMessage] =  useState("");
    const [messagesList, setMessagesList] =  useState([]);

    socket.emit("chat.getGroupMessage", room)
    useEffect(() => {
        socket.on("chat.getGroupMessageBack", (data : []) => {
            setMessagesList(data)
            socket.off("chat.getGroupMessageBack")
        });
    }, [socket]);

    useEffect(() => {
        socket.on("chat.sendBack", () => {
            socket.emit("chat.getGroupMessage", room)
            socket.off("chat.sendBack")
        });
    }, [socket]);

    const sendMsg = () => {
        if(currentMessage !== "" ) {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            socket.emit("chat.send", messageData);
        }
    };

    return (
        <div className="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">
        <header className="pt-6 pb-4 px-5 border-b border-gray-200">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                    <a className="inline-flex items-start mr-3" href="#0">
                        <img className="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width="48" height="48" alt="Lauren Marsano" />
                    </a>
                    <div className="pr-1">
                        <a className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                            <h2 className="text-xl leading-snug font-bold">John Decorte</h2>
                        </a>
                        <a className="block text-sm font-medium hover:text-indigo-500" href="#0">@jdecorte</a>
                    </div>
                </div>
            </div>
        </header>



        <div className="chat-body">

            <CloseButton onClick={handleclose} className="content-end" aria-label="Close modal" />
            {
                messagesList &&
                messagesList.map((data) => {
                    return <h3>{ data.sendby + "    |   "+ data.message + "    |   " + data.sendwhen}</h3>
                })
            }
            <div className="chat-footer">
                <input 
                    type="text"
                    placeholder="Type here..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    />
                <button onClick={sendMsg}>Send</button>
            </div>
       
        </div>
    </div>
    )
}
export default GroupChat;