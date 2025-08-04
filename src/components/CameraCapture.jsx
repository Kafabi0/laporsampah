import { useRef, useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // Aktifkan kamera saat komponen muncul
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      } catch (err) {
        console.error("Gagal akses kamera:", err);
        alert("Tidak dapat mengakses kamera.");
      }
    };

    startCamera();

    return () => {
      // Hentikan kamera saat komponen unmount
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    setPreviewUrl(imageData);

    // Convert to blob and send to parent
    canvas.toBlob((blob) => {
      const file = new File([blob], "laporan.jpg", { type: "image/jpeg" });
      onCapture(file);
    }, "image/jpeg");
  };

  return (
    <Box sx={{ textAlign: "center", mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Ambil Foto Langsung dari Kamera
      </Typography>
      {streaming ? (
        <>
          <video
            ref={videoRef}
            style={{
              width: "100%",
              maxHeight: 300,
              borderRadius: 8,
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          />
          <Button
            variant="contained"
            onClick={handleCapture}
            sx={{ mt: 2 }}
          >
            Ambil Foto
          </Button>
        </>
      ) : (
        <Typography color="text.secondary">Memuat kamera...</Typography>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {previewUrl && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Preview Foto:</Typography>
          <Box
            component="img"
            src={previewUrl}
            alt="Hasil Kamera"
            sx={{
              maxWidth: "100%",
              maxHeight: 250,
              borderRadius: 2,
              boxShadow: 2,
              mt: 1,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
