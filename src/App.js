import React, { useContext} from "react";
import {  Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./style.css";


import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={currentUser === null ? <Login /> : <Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
