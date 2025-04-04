
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import LocationPicker from "../components/LocationPicker";

const PredictionForm = () => {
  const locationState = useLocation();
  const defaultLocation = locationState?.state?.latLng || [20.5937, 78.9629]; // fallback to center of India

  const [location, setLocation] = useState(defaultLocation);
  const [formData, setFormData] = useState({
    date: "",
    rainfall: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      latitude: location[0],
      longitude: location[1],
    };
    navigate("/result", { state: dataToSend });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Predict Groundwater Level</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Location:</label>
          <LocationPicker value={location} onChange={setLocation} />
          <p className="mt-2 text-sm">Latitude: {location[0].toFixed(4)} | Longitude: {location[1].toFixed(4)}</p>
        </div>

        <TextField
          fullWidth
          type="date"
          name="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Rainfall (mm)"
          name="rainfall"
          onChange={handleChange}
          type="number"
          required
        />
        <Button variant="contained" type="submit" fullWidth>
          Predict
        </Button>
      </form>
    </div>
  );
};

export default PredictionForm;