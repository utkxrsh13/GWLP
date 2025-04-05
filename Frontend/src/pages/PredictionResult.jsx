import { Alert, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPrediction } from '../services/api.js'; // Adjust the import path as necessary
import Charts from '../components/Charts.jsx';
import Loader from '../components/ui/Loader.jsx';

const PredictionResult = () => {
  const location = useLocation();
  const formData = location.state;
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false); // State to toggle recommendations

  const getRecommendations = (level) => {
    if (level < 4) {
      return {
        crops: [
          "Pearl Millet (Bajra)",
          "Pigeon Pea (Arhar)",
          "Black Gram (Urad)",
          "Mustard",
          "Horse Gram"
        ],
        irrigation: `
          Groundwater levels are critically low. It is highly recommended to use micro-irrigation techniques such as drip and sprinkler systems.
          Avoid water-intensive crops completely. Irrigate only during early morning or late evening to reduce evaporation.
          Consider scheduling irrigation based on soil moisture sensors, if available, to maximize efficiency.
        `,
        tips: `
          - Construct or promote check dams, farm ponds, and percolation pits to recharge groundwater.
          - Adopt mulching practices using organic residues to retain soil moisture.
          - Avoid deep tillage as it can disturb subsoil moisture.
          - Educate surrounding communities about joint water conservation efforts.
        `
      };
    } else if (level < 4.5) {
      return {
        crops: [
          "Maize",
          "Soybean",
          "Groundnut",
          "Cotton",
          "Sunflower"
        ],
        irrigation: `
          Groundwater levels are moderate. Use efficient irrigation methods like sprinkler systems.
          Avoid surface flooding and practice alternate row irrigation for row crops.
          Adopt regulated deficit irrigation (RDI) to reduce water use without compromising yield significantly.
        `,
        tips: `
          - Harvest and store rainwater during the monsoon season using rooftop systems or contour trenches.
          - Rotate crops with legumes to improve soil structure and water retention.
          - Line irrigation canals to minimize water seepage.
          - Monitor crop evapotranspiration rates to plan water usage smartly.
        `
      };
    } else {
      return {
        crops: [
          "Paddy (in alternate wetting and drying mode)",
          "Sugarcane (with regulated irrigation)",
          "Banana",
          "Taro (Arbi)",
          "Colocasia"
        ],
        irrigation: `
          Groundwater levels are currently high. You can follow conventional irrigation methods, but still aim for efficiency to ensure long-term sustainability.
          Avoid over-irrigation to prevent waterlogging and nutrient leaching.
          Use tools like tensiometers or soil moisture meters to irrigate only when necessary.
        `,
        tips: `
          - Use green manure and cover crops to enhance water retention in soil.
          - Develop a water management plan to balance use with recharge potential.
          - Educate farm laborers and workers about proper irrigation practices.
          - Stay connected to local water resource departments to monitor any shifts in availability.
        `
      };
    }
  };

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const data = await getPrediction(formData);
        setResult(data);
        const predictionsArray = Object.entries(data.predictions).map(
          ([year, level]) => ({
            date: year,
            groundwater_level: level * 25,
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
      fetchPrediction();
    } else {
      setError("No input data provided.");
      setLoading(false);
    }
  }, [formData]);

  if (loading) return <div className="p-6 text-center translate-y-20"><Loader /></div>;
  if (error) return <div className="p-6"><Alert severity="error">{error}</Alert></div>;

  return (
    <div className="p-6 h-[100vh] flex flex-row">
  {/* Left Side - Chart Section */}
  <div className="w-1/2 p-4 bg-gray-100 rounded-lg shadow flex flex-col justify-center items-center">
    <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>
    <div className="w-full">
      <p><strong>Latitude:</strong> {formData.latitude}</p>
      <p><strong>Longitude:</strong> {formData.longitude}</p>
      <p className="mt-4 text-xl"><strong>Predicted Groundwater Level ({formData.year}):</strong>
        {result?.predictions[formData.year] ? `${(result.predictions[formData.year] * 25).toFixed(2)} feet` : "No data available"}
      </p>
    </div>
    <Charts data={chartData} />
  </div>

  {/* Right Side - Button + Sliding Recommendation Panel */}
<div className="w-1/2 p-4 bg-gray-100 rounded-lg shadow relative overflow-hidden">
  {/* Centered Show/Hide Button (when panel is hidden) */}
  {!showRecommendations && (
    <div className="flex flex-col items-center justify-center h-full">
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition z-10"
        onClick={() => setShowRecommendations(true)}
      >
        Show Recommendations
      </button>
    </div>
  )}

  {/* Sliding Recommendations Panel */}
  <div
    className={`absolute bottom-0 left-0 w-full h-full bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out
      ${showRecommendations ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
    `}
  >
    <h2 className="text-2xl font-bold mb-4">📌 Recommendations</h2>
    <p><strong>🌾Recommended Crops:</strong> {getRecommendations(result.predictions[formData.year]).crops.join(", ")}</p>
    <p className="mt-2"><strong>🚰Irrigation Advice:</strong> {getRecommendations(result.predictions[formData.year]).irrigation}</p>
    <p className="mt-2"><strong>🌟Additional Tips:</strong> {getRecommendations(result.predictions[formData.year]).tips}</p>

    {/* Button at the end of content */}
    <div className="mt-6 flex justify-center">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        onClick={() => setShowRecommendations(false)}
      >
        Hide Recommendations
      </button>
    </div>
  </div>
</div>

</div>

  );
};

export default PredictionResult;