import React, { useContext} from "react";
import {  Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./style.css";


import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function requestFullscreen() {
  const docElement = document.documentElement;
  if (docElement.requestFullscreen) {
    docElement.requestFullscreen();
  } else if (docElement.mozRequestFullScreen) { // Firefox
    docElement.mozRequestFullScreen();
  } else if (docElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
    docElement.webkitRequestFullscreen();
  } else if (docElement.msRequestFullscreen) { // IE/Edge
    docElement.msRequestFullscreen();
  }
}

const handleFullscreenClick = () => {
  requestFullscreen();
};

function App() {
  const {currentUser} = useContext(AuthContext)

  return (
    <div onClick={handleFullscreenClick} className="app">
      <Routes>
        <Route path="/" element={currentUser === null ? <Login /> : <Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
