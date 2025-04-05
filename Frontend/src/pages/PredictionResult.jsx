import { Alert, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getPrediction } from '../services/api.js'; // Adjust the import path as necessary
import Charts from '../components/Charts.jsx';

const PredictionResult = () => {
  const location = useLocation();
  const formData = location.state;
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const data = await getPrediction(formData);
        setResult(data);
        const predictionsArray = Object.entries(data.predictions).map(
          ([year, level]) => ({
            date: year,
            groundwater_level: level,
          })
        );
        setChartData(predictionsArray);
      } catch (err) {
        console.error("Error while fetching prediction:", err);
        setError("Failed to fetch prediction.");
      } finally {
        setLoading(false);
      }
    };

    if (formData) {
      fetchPrediction(); // ✅ call the renamed function
    } else {
      setError("No input data provided.");
      setLoading(false);
    }
  }, [formData]);

  if (loading) return <div className="p-6 text-center"><CircularProgress /></div>;
  if (error) return <div className="p-6"><Alert severity="error">{error}</Alert></div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <p><strong>Latitude:</strong> {formData.latitude}</p>
        <p><strong>Longitude:</strong> {formData.longitude}</p>
        <p><strong>Date:</strong> {formData.date}</p>
        <p><strong>Rainfall:</strong> {formData.rainfall} mm</p>
        <p className="mt-4 text-xl"><strong>Predicted Groundwater Level ({formData.date}):</strong> {result?.predictions?.[formData.date]} m</p>
      </div>
      {/* Chart Component */}
      <Charts data={chartData} />
    </div>
  );
};


export default PredictionResult