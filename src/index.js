import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styling/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

/* 
    checking web info such as num of requests and 
    performance related data for analysing web performance
*/
reportWebVitals();
