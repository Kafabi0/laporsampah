import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HistoryIcon from "@mui/icons-material/History";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link as RouterLink } from "react-router-dom";
import BackToTop from "../components/BackToTop";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  // Styles for card hover effect
  const cardHoverSx = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
    },
  };

  const btnHoverSx = {
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0 8px 16px rgba(76,175,80,0.6)",
      color: "grey.900",
    },
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("/assets/sampah.png")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          px: 2,
        }}
        data-aos="fade-in"
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: "0 3px 6px rgba(0,0,0,0.7)" }}
          >
            Lapor Sampah
          </Typography>
          <Typography
            variant="h6"
            mb={4}
            sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          >
            Laporkan sampah di sekitarmu, bantu bersihkan bersama komunitas
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/lapor"
            sx={{ ...btnHoverSx }}
          >
            Laporkan Sekarang
          </Button>
        </Container>
      </Box>

      {/* Feature Section */}
      <Box
        component="section"
        sx={{ py: 8, backgroundColor: "background.paper" }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Grid container spacing={4}>
            {[
              {
                icon: (
                  <CameraAltIcon
                    sx={{ fontSize: 64, color: "success.main" }}
                    aria-label="Ambil Foto"
                  />
                ),
                title: "Ambil Foto",
                desc: "Ambil gambar lokasi sampah untuk dilampirkan saat laporan.",
              },
              {
                icon: (
                  <LocationOnIcon
                    sx={{ fontSize: 64, color: "success.main" }}
                    aria-label="Tag Lokasi"
                  />
                ),
                title: "Tag Lokasi",
                desc: "Tentukan lokasi dengan akurat agar cepat ditindaklanjuti.",
              },
              {
                icon: (
                  <HistoryIcon
                    sx={{ fontSize: 64, color: "success.main" }}
                    aria-label="Riwayat Laporan"
                  />
                ),
                title: "Riwayat Laporan",
                desc: "Lihat status dan perkembangan laporan yang telah kamu buat.",
              },
            ].map(({ icon, title, desc }, i) => (
              <Grid
                item
                xs={12}
                md={4}
                key={title}
                data-aos="fade-up"
                data-aos-delay={100 * (i + 1)}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 5,
                    height: "100%",
                    borderRadius: 4,
                    cursor: "default",
                    ...cardHoverSx,
                  }}
                  tabIndex={0} // buat bisa focus keyboard
                >
                  <Box mb={3}>{icon}</Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 700, letterSpacing: 0.5 }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ lineHeight: 1.6, fontSize: "1rem" }}
                  >
                    {desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Community Section */}
      <Box
        component="section"
        sx={{ py: 8, bgcolor: "grey.100", textAlign: "center" }}
        data-aos="fade-up"
      >
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            mb={3}
            sx={{ fontWeight: 700, letterSpacing: 0.5 }}
          >
            Gabung Bersama Komunitas
          </Typography>
          <Typography variant="body1" mb={5} sx={{ fontSize: "1.1rem" }}>
            Bersama kita bersihkan lingkungan dan wujudkan kota bersih.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/community"
            sx={{ ...btnHoverSx, px: 5 }}
          >
            Gabung Sekarang
          </Button>
        </Container>
      </Box>

      {/* Testimoni Section */}
      <Box component="section" sx={{ py: 8 }} data-aos="fade-up">
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            mb={5}
            sx={{ fontWeight: 700, letterSpacing: 0.5 }}
          >
            Apa Kata Mereka
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                text: "Aplikasi ini sangat membantu! Kini saya bisa melaporkan sampah dengan cepat.",
                author: "Andi, Warga Surabaya",
              },
              {
                text: "Langkah kecil untuk perubahan besar. Terima kasih atas platform ini.",
                author: "Titid, Mahasiswa",
              },
              {
                text: "Laporkannya mudah, dan tanggapannya cepat. Recommended!",
                author: "Budi, Relawan",
              },
            ].map(({ text, author }, i) => (
              <Grid
                item
                xs={12}
                md={4}
                key={author}
                data-aos="fade-up"
                data-aos-delay={100 * (i + 1)}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 5,
                    borderRadius: 4,
                    height: "100%",
                    cursor: "default",
                    ...cardHoverSx,
                  }}
                  tabIndex={0}
                >
                  <Typography
                    variant="body1"
                    mb={4}
                    fontStyle="italic"
                    sx={{ fontSize: "1.05rem", lineHeight: 1.6 }}
                  >
                    "{text}"
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    - {author}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer CTA */}
      <Box
        component="footer"
        sx={{
          bgcolor: "success.main",
          color: "white",
          textAlign: "center",
          py: 6,
          mt: 6,
          boxShadow: "0 -4px 10px rgba(0,0,0,0.2)",
        }}
        data-aos="fade-in"
      >
        <Container maxWidth="sm">
          <Typography
            variant="h5"
            mb={4}
            sx={{ fontWeight: 700, letterSpacing: 0.5 }}
          >
            Ayo, beraksi untuk lingkungan bersih!
          </Typography>
          <Button
            variant="outlined"
            size="large"
            color="inherit"
            component={RouterLink}
            to="/report"
            sx={{
              ...btnHoverSx,
              borderWidth: 2,
              px: 6,
              py: 1.5,
              fontWeight: 700,
            }}
          >
            Laporkan Sampah Sekarang
          </Button>
        </Container>
      </Box>
      <BackToTop />
    </>
  );
}
