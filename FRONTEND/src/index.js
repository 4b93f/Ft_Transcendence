import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default function Test() {
  return <>Welcome!</>
}

ReactDOM.render(
  <React.StrictMode>
    <Test />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

