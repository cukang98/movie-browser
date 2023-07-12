import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Movies, NavBar, MovieInformation, Actors } from "./";
import React from "react";
import "./global.css";

function App() {
  return (
    <div className="root">
      <CssBaseline />
      <NavBar />
      <main className="content">
        <div className="toolkit" />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/movie/:id" element={<MovieInformation />} /> 
          <Route exact path="/approved" element={<Movies />} />
          <Route exact path="/actors/:id" element={<Actors />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;
