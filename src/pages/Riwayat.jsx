import { useEffect, useState } from "react";
import { Container, Card, Badge } from "react-bootstrap";

// Fungsi helper untuk memberi warna badge
const getStatusVariant = (status) => {
  switch (status) {
    case "diterima":
      return "secondary";
    case "proses":
      return "warning";
    case "selesai":
      return "success";
    default:
      return "dark";
  }
};

export default function Riwayat() {
  const [laporan, setLaporan] = useState([]);

  // Simulasi fetch data
  useEffect(() => {
    // Nanti diganti dengan axios.get('/api/laporan/user')
    const dummy = [
      {
        id: 1,
        deskripsi: "Sampah menumpuk di belakang pasar",
        kategori: "pasar",
        status: "proses",
        tanggapan: "Petugas sedang menuju lokasi",
        tanggal: "2025-08-03",
        lokasi: "-6.902, 107.618",
      },
      {
        id: 2,
        deskripsi: "Sampah rumah tangga belum diangkut",
        kategori: "rumah",
        status: "selesai",
        tanggapan: "Sudah dibersihkan pagi tadi",
        tanggal: "2025-08-01",
        lokasi: "-6.904, 107.610",
      },
    ];
    setLaporan(dummy);
  }, []);

  return (
    <Container>
      <h2 className="mb-4">Riwayat Laporan Anda</h2>
      {laporan.length === 0 ? (
        <p>Belum ada laporan.</p>
      ) : (
        laporan.map((item) => (
          <Card key={item.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{item.deskripsi}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Kategori: {item.kategori} | Tanggal: {item.tanggal}
              </Card.Subtitle>
              <p>Lokasi: {item.lokasi}</p>
              <Badge bg={getStatusVariant(item.status)} className="mb-2">
                Status: {item.status}
              </Badge>
              {item.tanggapan && (
                <div className="mt-2 text-success">
                  <strong>Tanggapan Admin:</strong> {item.tanggapan}
                </div>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}
