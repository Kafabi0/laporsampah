import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Divider,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MapsPicker from "../components/MapsPicker";
import LocationSearch from "../components/LocationSearch";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Lapor() {
  const [formData, setFormData] = useState({
    foto: null,
    deskripsi: "",
    kategori: "",
  });

  const [preview, setPreview] = useState(null);
  const [position, setPosition] = useState(null);
  const [alamat, setAlamat] = useState("");
  const [loading, setLoading] = useState(false);

  // Reverse geocoding
  const fetchAddress = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.display_name) setAlamat(data.display_name);
      else setAlamat("Alamat tidak ditemukan.");
    } catch {
      setAlamat("Gagal mengambil alamat.");
    }
  };

  // Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : null;

    setFormData((prev) => ({
      ...prev,
      [name]: file || value,
    }));

    // Preview gambar
    if (name === "foto" && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!position) {
      return MySwal.fire({
        icon: "warning",
        title: "Lokasi Belum Dipilih",
        text: "Silakan pilih lokasi terlebih dahulu.",
        confirmButtonColor: "#4caf50", // hijau recycle
        backdrop: `
          rgba(76,175,80,0.4)
          url("https://cdn-icons-png.flaticon.com/512/565/565547.png")
          left top
          no-repeat
        `,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }

    setLoading(true);

    const dataToSend = {
      ...formData,
      lokasi: `${position.lat},${position.lng}`,
      alamat,
    };

    try {
      // Simulasi kirim ke backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Data dikirim:", dataToSend);

      await MySwal.fire({
        icon: "success",
        title: "Laporan Berhasil!",
        html: `
          <p>🎉 Terima kasih atas kontribusimu untuk lingkungan bersih.</p>
          <img src="/public/alert.gif" alt="Recycle" width="150" style="margin-top:10px"/>
        `,
        confirmButtonColor: "#4caf50",
        background: "#e8f5e9", // hijau sejuk
        iconColor: "#388e3c", // hijau gelap
        timer: 3000,
        timerProgressBar: true, // tampilkan progress bar timer
        showConfirmButton: false,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });

      // Reset form
      setFormData({ foto: null, deskripsi: "", kategori: "" });
      setPreview(null);
      setPosition(null);
      setAlamat("");
    } catch (err) {
      console.error("Gagal:", err);
      await MySwal.fire({
        icon: "error",
        title: "Gagal Mengirim",
        text: "Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.",
        confirmButtonColor: "#d32f2f",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Card elevation={6}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            🗑️ Lapor Sampah
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            {/* Upload Gambar */}
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
            >
              Ambil Foto dari Kamera
              <input
                hidden
                accept="image/*"
                capture="environment"
                type="file"
                name="foto"
                onChange={handleChange}
              />
            </Button>

            {formData.foto && (
              <Typography variant="body2" color="text.secondary">
                File: {formData.foto.name}
              </Typography>
            )}

            {preview && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2">Preview Foto:</Typography>
                <Box
                  component="img"
                  src={preview}
                  alt="preview"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: 250,
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: 3,
                    mt: 1,
                  }}
                />
              </Box>
            )}

            {/* Deskripsi & Kategori */}
            <TextField
              label="Deskripsi Masalah Sampah"
              name="deskripsi"
              multiline
              rows={3}
              value={formData.deskripsi}
              onChange={handleChange}
              required
            />

            <TextField
              select
              label="Kategori Sampah"
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Pilih Kategori</MenuItem>
              <MenuItem value="rumah">Sampah Rumah Tangga</MenuItem>
              <MenuItem value="pasar">Sampah Pasar</MenuItem>
              <MenuItem value="industri">Sampah Industri</MenuItem>
            </TextField>

            {/* Lokasi */}
            <Typography variant="subtitle1">Cari Lokasi</Typography>
            <LocationSearch
              setPosition={(pos) => {
                setPosition(pos);
                fetchAddress(pos.lat, pos.lng);
              }}
            />

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Lokasi Sampah (klik di peta, cari lokasi, atau tombol)
            </Typography>
            <Box sx={{ height: 300, width: "100%", mb: 1 }}>
              <MapsPicker
                position={position}
                setPosition={(pos) => {
                  setPosition(pos);
                  fetchAddress(pos.lat, pos.lng);
                }}
              />
            </Box>

            {position && (
              <Alert icon={<LocationOnIcon />} severity="info">
                <strong>Lokasi Terpilih:</strong> {position.lat.toFixed(5)},
                {position.lng.toFixed(5)} <br />
                <strong>Alamat:</strong> {alamat}
              </Alert>
            )}

            <Button
              variant="contained"
              type="submit"
              size="large"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? "Mengirim..." : "Kirim Laporan"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
