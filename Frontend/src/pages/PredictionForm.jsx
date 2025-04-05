import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import LocationPicker from "../components/LocationPicker";
import { getPrediction } from "../services/api.js";


// // Custom red marker icon
// const markerIcon = new L.Icon({
//   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

const stations = [
  {id: 1, latitude: 26.85833333, longitude: 77.6},
  {id: 2, latitude: 27.02361111, longitude: 77.85},
  {id: 3, latitude: 27.09166667, longitude: 77.67777778},
  {id: 4, latitude: 27.17083333, longitude: 77.96666667},
  {id: 5, latitude: 26.81666667, longitude: 77.45},
  {id: 6, latitude: 27.09166667, longitude: 77.66833333},
  {id: 7, latitude: 27.0, longitude: 77.96833333},
  {id: 8, latitude: 27.23333333, longitude: 77.83333333},
  {id: 9, latitude: 26.83333333, longitude: 78.70333333},
  {id: 10, latitude: 26.89305556, longitude: 78.49722222},
  {id: 11, latitude: 27.17833333, longitude: 77.81833333},
  {id: 12, latitude: 26.96111111, longitude: 77.75222222},
  {id: 13, latitude: 26.93333333, longitude: 77.76666667},
  {id: 14, latitude: 27.07944444, longitude: 77.65833333},
  {id: 15, latitude: 27.09166667, longitude: 77.66833333},
  {id: 16, latitude: 27.11666667, longitude: 77.925},
  {id: 17, latitude: 27.21944444, longitude: 77.84722222},
  {id: 18, latitude: 26.94166667, longitude: 77.84166667},
  {id: 19, latitude: 26.94166667, longitude: 77.92777778},
  {id: 20, latitude: 27.3, longitude: 78.19444444},
  {id: 21, latitude: 26.90166667, longitude: 78.475},
  {id: 22, latitude: 26.8375, longitude: 77.49027778},
  {id: 23, latitude: 27.13333333, longitude: 77.7625},
  {id: 24, latitude: 27.04166667, longitude: 78.25},
  {id: 25, latitude: 27.07388889, longitude: 77.98333333},
  {id: 26, latitude: 27.14555556, longitude: 77.77},
  {id: 27, latitude: 27.32083333, longitude: 78.1875},
  {id: 28, latitude: 27.31166667, longitude: 78.02666667},
  {id: 29, latitude: 27.10833333, longitude: 78.15833333},
  {id: 30, latitude: 27.23333333, longitude: 78.2},
  {id: 31, latitude: 27.03166667, longitude: 78.125},
  {id: 32, latitude: 26.88472222, longitude: 78.37916667},
  {id: 33, latitude: 26.9, longitude: 77.675},
  {id: 34, latitude: 26.83, longitude: 78.7},
  {id: 35, latitude: 26.86527778, longitude: 78.58611111}
];


// Helper function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Calculate distance using Haversine formula
function calculateDistance(selected, station) {
  const R = 6371000; // Radius of Earth in meters
  const dLat = toRadians(station.latitude - selected.latitude);
  const dLon = toRadians(station.longitude - selected.longitude);

  const lat1 = toRadians(selected.latitude);
  const lat2 = toRadians(station.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

// Find the nearest station from the selected location
function findNearestStation(selected) {
  let minDistance = Infinity;
  let nearestStation = null;

  for (const station of stations) {
    const distance = calculateDistance(selected, station);
    if (distance < minDistance) {
      minDistance = distance;
      nearestStation = station;
    }
  }

  return {
    latLng: {
      latitude: nearestStation.latitude,
      longitude: nearestStation.longitude 
    },
  };
}




const PredictionForm = () => {
  const locationState = useLocation();
  const [location, setLocation] = useState([26.83, 78.7]); // default center
  const [formData, setFormData] = useState({ date: "" });
  const navigate = useNavigate();

  // 🔁 Update location when route state changes
  useEffect(() => {
    if (locationState?.state?.latLng) {
      setLocation(locationState.state.latLng);
    }
  }, [locationState?.state?.latLng]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selected = {
      latitude: location[0],
      longitude: location[1]
    };
    console.log("Selected location:", selected);

    const nearestStation = findNearestStation(selected);
    console.log("Nearest station:", nearestStation);

    const dataToSend = {
      latitude: nearestStation.latLng.latitude,
      longitude: nearestStation.latLng.longitude,
      year: formData.date || 2032,
    };
console.log("this is the data send for depth",dataToSend);

    try {
      const prediction = await getPrediction(dataToSend);
      console.log("Prediction result:", prediction);

      navigate("/result", { state: { ...dataToSend, prediction } });
    } catch (error) {
      console.error("Error while calling ML model:", error);
      alert("Failed to get prediction. Please check the backend server.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Predict Groundwater Level</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Location:</label>
          <LocationPicker value={location} onChange={setLocation} stations={stations} />
          <p className="mt-2 text-sm">Latitude: {location[0]} | Longitude: {location[1]}</p>
        </div>

        <TextField
          fullWidth
          type="number"
          name="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          required
        />
        <Button variant="contained" type="submit" fullWidth>Predict</Button>
      </form>
    </div>

  );
};

export default PredictionForm;
