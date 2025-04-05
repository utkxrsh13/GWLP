// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Button, TextField, Paper, Typography } from "@mui/material";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Custom red marker icon
// const markerIcon = new L.Icon({
//   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// // Component to handle map click
// const ClickMarker = ({ onSelect }) => {
//   useMapEvents({
//     click(e) {
//       onSelect([e.latlng.lat, e.latlng.lng]);
//     },
//   });
//   return null;
// };

// // Permanent marker coordinates
// const permanentMarkers = [
//   { lat: 28.6139, lng: 77.209, name: "Delhi" },
//   { lat: 19.076, lng: 72.8777, name: "Mumbai" },
//   { lat: 13.0827, lng: 80.2707, name: "Chennai" },
//   { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
//   { lat: 23.0225, lng: 72.5714, name: "Ahmedabad" },
//   { lat: 26.9124, lng: 75.7873, name: "Jaipur" },
//   { lat: 17.385, lng: 78.4867, name: "Hyderabad" },
//   { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
//   { lat: 18.5204, lng: 73.8567, name: "Pune" },
//   { lat: 24.5854, lng: 73.7125, name: "Udaipur" },
// ];

// const PredictionForm = () => {
//   const locationState = useLocation();
//   const defaultLocation =[26.83333333, 78.70333333]; // center of India
//   const [location, setLocation] = useState(defaultLocation);
//   const [formData, setFormData] = useState({ year: "2032"});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const dataToSend = {
//       ...formData,
//       latitude: location[0],
//       longitude: location[1],
//     };
//     navigate("/result", { state: dataToSend });
//   };

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 min-h-screen px-4 overflow-x-hidden">
//       {/* Left Side: Form */}
//       <div className="w-full lg:w-[500px] pt-6 flex flex-col">
//         <Paper elevation={3} className="p-6 flex-grow">
//           <Typography variant="h5" gutterBottom>
//             Predict Groundwater Level
//           </Typography>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1 font-medium">Select Location on Map:</label>
//               <p className="mt-2 text-sm">
//                 Latitude: {location[0].toFixed(4)} | Longitude: {location[1].toFixed(4)}
//               </p>
//             </div>
//             <TextField
//               fullWidth
//               type="number"
//               name="date"
//               label="Date"
//               InputLabelProps={{ shrink: true }}
//               onChange={handleChange}
//               required
//             />
//             <Button variant="contained" type="submit" fullWidth>
//               Predict
//             </Button>
//           </form>
//         </Paper>
//       </div>

//       {/* Right Side: Map */}
//       <div className="w-full lg:w-full pt-6 flex flex-col">
//         <Paper elevation={3} className="flex-grow p-4 flex items-center justify-center">
//           <div className="w-full h-full">
//             <MapContainer
//               center={location}
//               zoom={5}
//               scrollWheelZoom={true}
//               style={{ height: "100%", width: "100%" }}
//             >
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//               <ClickMarker onSelect={setLocation} />
//               {permanentMarkers.map((marker, idx) => (
//                 <Marker key={idx} position={[marker.lat, marker.lng]} icon={markerIcon}>
//                   <Popup>{marker.name}</Popup>
//                 </Marker>
//               ))}
//               {location && (
//                 <Marker position={location} icon={markerIcon}>
//                   <Popup>Your Selected Location</Popup>
//                 </Marker>
//               )}
//             </MapContainer>
//           </div>
//         </Paper>
//       </div>
//     </div>
//   );
// };

// export default PredictionForm;

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
      <MapContainer center={[26.83333333, 78.70333333]} zoom={5} style={{ height: "500px", width: "100%" }}>
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