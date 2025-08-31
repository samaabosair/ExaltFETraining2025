import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import MainPage from "./pages/main/main";
import CarDetails from "./pages/car/CarDetails"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/car/:id" element={<CarDetails />} /> 
     
      </Routes>
    </Router>
  );
}

export default App;
