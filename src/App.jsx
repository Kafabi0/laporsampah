import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Riwayat from './pages/Riwayat';
import Report from './components/Report';

function App() {
  return (
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/riwayat" element={<Riwayat />} />
        </Routes>
      </div>
  );
}

export default App;