import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import LocationPicker from "../components/LocationPicker";
import { getPrediction } from "../services/api.js"; // Adjust the import path as necessary

const PredictionForm = () => {
  const locationState = useLocation();
  const defaultLocation = locationState?.state?.latLng || [26.83, 78.7]; // fallback to center of India

  const [location, setLocation] = useState(defaultLocation);
  const [formData, setFormData] = useState({
    date: "",
    rainfall: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = {
      latitude: 26.83,
      longitude: 78.7,
      year: 2032, // fallback to 2032 if empty
    };
  
    try {
      const prediction = await getPrediction(dataToSend);
      console.log("Prediction result:", prediction);
      
      // Optionally navigate with prediction result
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
          <LocationPicker value={location} onChange={setLocation} />
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
        <Button variant="contained" type="submit" fullWidth>
          Predict
        </Button>
      </form>
    </div>
  );
};

export default PredictionForm;