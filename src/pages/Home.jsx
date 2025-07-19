import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMapMarkerAlt, faHistory } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <header
        className="jumbotron jumbotron-fluid text-white text-center d-flex align-items-center"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/assets/sampah.png") center/contain no-repeat`,
          height: '100vh',
          marginBottom: 0,
        }}
        data-aos="fade-in"
      >
        <div className="container">
          <h1 className="display-3 font-weight-bold">Lapor Sampah</h1>
          <p className="lead">Laporkan sampah di sekitarmu, bantu bersihkan bersama komunitas</p>
          <Link to="/report" className="btn btn-success btn-lg mt-3">Laporkan Sekarang</Link>
        </div>
      </header>

      {/* Feature Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="shadow-sm p-4 rounded h-100">
                <FontAwesomeIcon icon={faCamera} size="3x" className="mb-3 text-success" />
                <h5>Ambil Foto</h5>
                <p>Ambil gambar lokasi sampah untuk dilampirkan saat laporan.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="shadow-sm p-4 rounded h-100">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" className="mb-3 text-success" />
                <h5>Tag Lokasi</h5>
                <p>Tentukan lokasi dengan akurat agar cepat ditindaklanjuti.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="shadow-sm p-4 rounded h-100">
                <FontAwesomeIcon icon={faHistory} size="3x" className="mb-3 text-success" />
                <h5>Riwayat Laporan</h5>
                <p>Lihat status dan perkembangan laporan yang telah kamu buat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Komunitas Section */}
      <section className="bg-light py-5 text-center" data-aos="fade-up">
        <div className="container">
          <h2 className="mb-4">Gabung Bersama Komunitas</h2>
          <p className="mb-4">Bersama kita bersihkan lingkungan dan wujudkan kota bersih.</p>
          <Link to="/community" className="btn btn-success btn-lg">Gabung Sekarang</Link>
        </div>
      </section>

      {/* Testimoni Section */}
      <section className="py-5" data-aos="fade-up">
        <div className="container text-center">
          <h2 className="mb-5">Apa Kata Mereka</h2>
          <div className="row">
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="border rounded p-4 shadow-sm h-100">
                <p>"Aplikasi ini sangat membantu! Kini saya bisa melaporkan sampah dengan cepat."</p>
                <strong>- Andi, Warga Surabaya</strong>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="border rounded p-4 shadow-sm h-100">
                <p>"Langkah kecil untuk perubahan besar. Terima kasih atas platform ini."</p>
                <strong>- Siti, Mahasiswa</strong>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="border rounded p-4 shadow-sm h-100">
                <p>"Laporkannya mudah, dan tanggapannya cepat. Recommended!"</p>
                <strong>- Budi, Relawan</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-success text-white text-center py-4" data-aos="fade-in">
        <div className="container">
          <h5 className="mb-3">Ayo, beraksi untuk lingkungan bersih!</h5>
          <Link to="/report" className="btn btn-outline-light btn-lg">Laporkan Sampah Sekarang</Link>
        </div>
      </footer>
    </>
  );
}
