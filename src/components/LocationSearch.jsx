import { useState } from "react";

export default function LocationSearch({ setPosition }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchLocation = async () => {
    if (!query) return;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}`;
    const res = await fetch(url);
    const data = await res.json();
    setResults(data);
  };

  const handleSelect = (place) => {
    setPosition({
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    });
    setResults([]);
    setQuery(place.display_name);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Cari lokasi..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchLocation()}
        style={{ width: "100%", padding: "8px" }}
      />
      {results.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "4px",
            border: "1px solid #ccc",
            maxHeight: "150px",
            overflowY: "auto",
            backgroundColor: "white",
            position: "absolute",
            width: "100%",
            zIndex: 10,
          }}
        >
          {results.map((place) => (
            <li
              key={place.place_id}
              style={{ padding: "4px", cursor: "pointer" }}
              onClick={() => handleSelect(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
