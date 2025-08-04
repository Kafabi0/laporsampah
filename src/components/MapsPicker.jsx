import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : <Marker position={position} />;
}

export default function MapsPicker({
  position,
  setPosition,
  onUseCurrentLocation,
}) {
  const [center, setCenter] = useState({ lat: -6.90389, lng: 107.61861 });

  useEffect(() => {
    if (!position) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setCenter({ lat: latitude, lng: longitude });
            setPosition({ lat: latitude, lng: longitude });
            if (onUseCurrentLocation) onUseCurrentLocation({ lat: latitude, lng: longitude });
          },
          (err) => {
            console.warn("Error dapat lokasi:", err.message);
          }
        );
      }
    } else {
      setCenter(position);
    }
  }, [position, setPosition, onUseCurrentLocation]);

  return (
    <>
      <button
        type="button"
        className="btn btn-success mb-2"
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const { latitude, longitude } = pos.coords;
                setCenter({ lat: latitude, lng: longitude });
                setPosition({ lat: latitude, lng: longitude });
                if (onUseCurrentLocation) onUseCurrentLocation({ lat: latitude, lng: longitude });
              },
              (err) => alert("Gagal mendapatkan lokasi: " + err.message)
            );
          } else {
            alert("Geolocation tidak didukung browser Anda.");
          }
        }}
      >
        📍 Gunakan Lokasi Saat Ini
      </button>

      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </>
  );
}
