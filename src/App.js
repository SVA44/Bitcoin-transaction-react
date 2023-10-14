import React from 'react';
import { styled } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Pages/Home';
import Information from './Pages/Information';

const Program = () => {

  //Python Server URL
  const py_server = "http://127.0.0.1:8000";

  return(
    <div>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="information" element={<Information url={py_server} />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default Program;