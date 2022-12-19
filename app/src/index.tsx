import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Monster from './Monster';

const root =
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Monster />
  </React.StrictMode>,
);
