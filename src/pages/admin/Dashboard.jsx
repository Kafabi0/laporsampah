import { useState, useEffect } from "react";
import { Container, Table, Form, Badge } from "react-bootstrap";

// helper untuk warna badge status
const getBadgeVariant = (status) => {
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

export default function AdminDashboard() {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    // dummy data sementara (ganti nanti dengan axios.get ye)
    const dummyData = [
      {
        id: 1,
        nama: "Budi",
        deskripsi: "Sampah di belakang sekolah",
        kategori: "rumah",
        lokasi: "-6.901, 107.618",
        status: "diterima",
        tanggal: "2025-08-02",
      },
      {
        id: 2,
        nama: "Sari",
        deskripsi: "Sampah menumpuk di pasar",
        kategori: "pasar",
        lokasi: "-6.902, 107.620",
        status: "proses",
        tanggal: "2025-08-03",
      },
    ];
    setLaporan(dummyData);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setLaporan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );

    // Nanti kirim update ke backend pakai axios.put
    console.log(`Ubah laporan ID ${id} ke status: ${newStatus}`);
  };

  return (
    <Container>
      <h2 className="mb-4">Dashboard Admin - Semua Laporan</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Kategori</th>
            <th>Lokasi</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Ubah Status</th>
          </tr>
        </thead>
        <tbody>
          {laporan.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nama}</td>
              <td>{item.deskripsi}</td>
              <td>{item.kategori}</td>
              <td>{item.lokasi}</td>
              <td>{item.tanggal}</td>
              <td>
                <Badge bg={getBadgeVariant(item.status)}>
                  {item.status}
                </Badge>
              </td>
              <td>
                <Form.Select
                  size="sm"
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChange(item.id, e.target.value)
                  }
                >
                  <option value="diterima">Diterima</option>
                  <option value="proses">Proses</option>
                  <option value="selesai">Selesai</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
