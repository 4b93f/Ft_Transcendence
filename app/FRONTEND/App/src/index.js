import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Chat from './components/Chat/Chat'
import io from 'socket.io-client'

const socket = io("http://localhost:3001");

export default function Test() {
  return (
    // <div className="container max-w-2xl mt-16">
    //   <Chat socket={socket} username={"Test"}/>
    // </div>
    <>Welcome</>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Test />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

