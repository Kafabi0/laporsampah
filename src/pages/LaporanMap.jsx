import { useEffect, useState } from 'react';
import MapsLaporan from '../components/MapsPicker';
import { Container } from 'react-bootstrap';

export default function LaporanMap() {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    // Data dummy, nanti diganti fetch axios dari backend
    setLaporan([
      { id: 1, lokasi: '-6.902,107.618', deskripsi: 'Sampah di pasar', kategori: 'pasar' },
      { id: 2, lokasi: '-6.905,107.620', deskripsi: 'Sampah rumah tangga', kategori: 'rumah' },
    ]);
  }, []);

  return (
    <Container>
      <h2 className="mb-3">Peta Titik Laporan Sampah</h2>
      <MapsLaporan laporan={laporan} />
    </Container>
  );
}
