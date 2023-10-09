import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import './Styling/App.css';
import ResponsiveGrid from './Components/Grid';
import Header from './Components/Header';
import Footer from './Components/Footer.js';

function App() {

    const [passedData,setPassedData] = React.useState([]);
    const [gridData, setGridData] = React.useState([]);
    const callbackFunction = (data) => {
      setPassedData(data);

      // SET GRID Data
      const grid_data = JSON.parse(JSON.stringify(passedData["Grid"]));
      setGridData(grid_data);



    }
  return (
  <div>
    <Header callbackFn = {callbackFunction}/>
    <ResponsiveGrid 
      address = {gridData.WalletAddress}
      balance = {gridData.Balance}
      value_in_usd = {gridData.Value_in_USD}
    />
    <Footer/>
  </div>
  );
}

export default App;