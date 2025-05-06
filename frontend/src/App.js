import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Menu from "./components/Menu";
import Home from "./components/Home";
import DonateFood from "./components/DonateFood";
import RequestFood from "./components/RequestFood";
import History from "./components/History";
import Header from "./components/Header"; // Importing the Header component

function App() {
  return (
    <Router>
      <Header />{" "}
      {/* This ensures that the Header (with the logout button) appears on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/donate" element={<DonateFood />} />
        <Route path="/request" element={<RequestFood />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
