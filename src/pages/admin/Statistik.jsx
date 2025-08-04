import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const kategoriList = ["semua", "rumah", "pasar", "industri"];
const lokasiList = ["semua", "RT 01", "RT 02", "Pasar", "Jl. Raya"];

export default function Statistik() {
  const [filter, setFilter] = useState({
    kategori: "semua",
    lokasi: "semua",
  });

  const [dataMingguan, setDataMingguan] = useState({});
  const [dataLokasi, setDataLokasi] = useState({});

  useEffect(() => {
    // nanti ganti dengan axios.get ye (`/api/statistik?kategori=x&lokasi=y`)
    const filteredDummy = {
      minggu: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
      jumlah: [3, 7, 5, 9],
      lokasi: [
        { nama: "Pasar", total: 5 },
        { nama: "RT 01", total: 3 },
        { nama: "RT 02", total: 4 },
      ],
    };

    setDataMingguan({
      labels: filteredDummy.minggu,
      datasets: [
        {
          label: "Jumlah Laporan",
          data: filteredDummy.jumlah,
          backgroundColor: "#198754",
        },
      ],
    });

    setDataLokasi({
      labels: filteredDummy.lokasi.map((l) => l.nama),
      datasets: [
        {
          label: "Laporan",
          data: filteredDummy.lokasi.map((l) => l.total),
          backgroundColor: ["#0d6efd", "#6610f2", "#198754"],
        },
      ],
    });
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container>
      <h2 className="mb-4">Statistik Laporan Sampah</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Label>Kategori Sampah</Form.Label>
          <Form.Select
            name="kategori"
            value={filter.kategori}
            onChange={handleFilterChange}
          >
            {kategoriList.map((k) => (
              <option key={k} value={k}>
                {k === "semua" ? "Semua Kategori" : k}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Lokasi</Form.Label>
          <Form.Select
            name="lokasi"
            value={filter.lokasi}
            onChange={handleFilterChange}
          >
            {lokasiList.map((l) => (
              <option key={l} value={l}>
                {l === "semua" ? "Semua Lokasi" : l}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <div className="mb-5">
        <h5 className="mb-3">📅 Jumlah Laporan per Minggu</h5>
        <Bar data={dataMingguan} options={{ responsive: true }} />
      </div>

      <div>
        <h5 className="mb-3">📍 Lokasi dengan Laporan Terbanyak</h5>
        <Pie data={dataLokasi} options={{ responsive: true }} />
      </div>
    </Container>
  );
}
