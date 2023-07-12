import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Movies } from './';
import React, { useRef } from 'react'
import './global.css'

function App() {
  return (
    <div className="root">
      <Routes>
        <Route exact path= '/' element={<Movies />} /> 
      </Routes>
    </div>
  );
}

export default App;
