import React, { useState } from 'react';

function Lapor() {
  const [foto, setFoto] = useState(null);
  const [lokasi, setLokasi] = useState('');
  const [catatan, setCatatan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const laporan = {
      foto,
      lokasi,
      catatan,
      status: 'Dikirim',
      waktu: new Date().toLocaleString(),
    };
    const existing = JSON.parse(localStorage.getItem('laporan')) || [];
    localStorage.setItem('laporan', JSON.stringify([...existing, laporan]));
    alert('Laporan berhasil dikirim!');
    setFoto(null);
    setLokasi('');
    setCatatan('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Form Lapor Sampah</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFoto(URL.createObjectURL(e.target.files[0]))}
        required
        className="mb-4 block"
      />
      <input
        type="text"
        placeholder="Lokasi (contoh: Jl. Merdeka, sungai ABC)"
        value={lokasi}
        onChange={(e) => setLokasi(e.target.value)}
        required
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Catatan tambahan (opsional)"
        value={catatan}
        onChange={(e) => setCatatan(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Kirim Laporan</button>
    </form>
  );
}

export default Lapor;