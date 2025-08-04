import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NavbarComponent from "./components/NavbarComponent";
import Riwayat from "./pages/Riwayat";
import Report from "./components/Report";
import Lapor from "./pages/Lapor";
import Statistik from "./pages/admin/Statistik";
import LaporanMap from "./pages/LaporanMap";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader"; // pastikan file Loader sudah dibuat

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // aktifkan loading setiap kali route berubah
    setLoading(true);

    // Simulasi delay loader (bisa diganti dengan logic async data fetch)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5 detik

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100">
      {loading && <Loader />}
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
