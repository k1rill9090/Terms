import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// export const backend_url = "https://d52e-91-223-25-127.ngrok-free.app";
export const backend_url = "http://127.0.0.1:5000";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


