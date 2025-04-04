
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@mui/material";

const LocationMarker = ({ setLatLng }) => {
  useMapEvents({
    click(e) {
      setLatLng([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const MapView = () => {
  const [latLng, setLatLng] = React.useState(null);
  const navigate = useNavigate();

  const handleUseLocation = () => {
    if (latLng) {
      navigate("/predict", { state: { latLng } });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select Location</h2>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setLatLng={setLatLng} />
        {latLng && <Marker position={latLng} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png' })} />}
      </MapContainer>
      {latLng && (
        <div className="mt-4 text-center">
          <p>Latitude: {latLng[0].toFixed(4)}, Longitude: {latLng[1].toFixed(4)}</p>
          <Button variant="contained" className="mt-2" onClick={handleUseLocation}>
            Use this Location
          </Button>
        </div>
      )}
    </div>
  );
};

export default MapView;