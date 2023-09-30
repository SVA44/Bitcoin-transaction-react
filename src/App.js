import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import './Styling/App.css';
import ResponsiveGrid from './Components/Grid';
import Header from './Components/Header';
import Footer from './Components/Footer.js';

function App() {
  return (
  <div>
    <Header/>
    <ResponsiveGrid/>
    <Footer/>
  </div>
  );
}

export default App;