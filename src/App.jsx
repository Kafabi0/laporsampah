import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavbarComponent from "./components/NavbarComponent";
import Riwayat from "./pages/Riwayat";
import Report from "./components/Report";
import Lapor from "./pages/Lapor";
import Statistik from "./pages/admin/Statistik";
import LaporanMap from "./pages/LaporanMap";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarComponent />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lapor" element={<Lapor />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/report" element={<Report />} />
        <Route path="/admin/statistik" element={<Statistik />} />
        <Route path="/maps" element={<LaporanMap />} />
      </Routes>
    </div>
  );
}

export default App;
