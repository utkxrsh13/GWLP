import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ClickMarker = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const LocationPicker = ({ value, onChange }) => {
  useEffect(() => {
    if (!value) {
      onChange([20.5937, 78.9629]); // Default to center of India
    }
  }, [value, onChange]);

  return (
    <MapContainer
      center={value || [20.5937, 78.9629]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", marginTop: "1rem" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickMarker onSelect={onChange} />
      {value && <Marker position={value} icon={markerIcon} />}
    </MapContainer>
  );
};

export default LocationPicker;
