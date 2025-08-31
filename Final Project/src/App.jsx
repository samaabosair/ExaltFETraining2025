import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import MainPage from "./pages/main/main";
import CarDetails from "./pages/car/CarDetails"; 
import HistoryPage from "./pages/History/HistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/car/:id" element={<CarDetails />} /> 
        <Route path="/history" element={<HistoryPage />} /> {/* هنا الراوت */}
      </Routes>
    </Router>
  );
}
export default App;
