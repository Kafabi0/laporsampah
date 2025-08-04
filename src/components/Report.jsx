//kaga dipake ini

import React, { useState, useEffect } from "react";

export default function Report() {
  const [foto, setFoto] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  const [lokasi, setLokasi] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser Anda");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLokasi({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setError("Gagal mendapatkan lokasi");
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foto) {
      alert("Foto sampah wajib diupload!");
      return;
    }
    if (!lokasi.lat || !lokasi.lng) {
      alert("Lokasi belum didapatkan, pastikan akses lokasi diizinkan");
      return;
    }

    // Contoh upload dengan FormData
    const formData = new FormData();
    formData.append("foto", foto);
    formData.append("deskripsi", deskripsi);
    formData.append("latitude", lokasi.lat);
    formData.append("longitude", lokasi.lng);

    try {
      // Ganti URL sesuai API backendmu
      const res = await fetch("http://localhost:8081/reports", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Gagal submit laporan");
      alert("Laporan berhasil dikirim, terima kasih!");
      setFoto(null);
      setDeskripsi("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Lapor Sampah</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Foto Sampah</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
            required
          />
        </div>

        <div className="mb-3">
          <label>Deskripsi</label>
          <textarea
            className="form-control"
            rows="3"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Deskripsikan lokasi dan kondisi sampah"
            required
          />
        </div>

        <div className="mb-3">
          <label>Lokasi</label>
          <input
            type="text"
            className="form-control"
            value={
              lokasi.lat && lokasi.lng
                ? `Lat: ${lokasi.lat.toFixed(5)}, Lng: ${lokasi.lng.toFixed(5)}`
                : "Lokasi belum didapatkan"
            }
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-success">
          Kirim Laporan
        </button>
      </form>
    </div>
  );
}
