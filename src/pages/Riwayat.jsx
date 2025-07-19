import React from 'react';

function Riwayat() {
  const laporan = JSON.parse(localStorage.getItem('laporan')) || [];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Riwayat Laporan</h2>
      {laporan.length === 0 ? (
        <p>Belum ada laporan.</p>
      ) : (
        laporan.map((item, index) => (
          <div key={index} className="mb-4 p-4 border rounded bg-white">
            {item.foto && <img src={item.foto} alt="lokasi" className="w-full h-48 object-cover mb-2" />}
            <p><strong>Lokasi:</strong> {item.lokasi}</p>
            <p><strong>Catatan:</strong> {item.catatan}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Waktu:</strong> {item.waktu}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Riwayat;