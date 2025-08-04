import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPrediction } from '../services/api.js';
import WaterGlass from '../components/ui/WaterGlass.jsx';
import PredictionCard from '../components/ui/PredictionCard.jsx';
import InteractiveRecommendations from '../components/ui/InteractiveRecommendations.jsx';
import EnhancedCharts from '../components/ui/EnhancedCharts.jsx';
import FeedbackWidget from '../components/ui/FeedbackWidget.jsx';
import LoadingScreen from '../components/ui/LoadingScreen.jsx';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import useNotification from '../hooks/useNotification.jsx';

const PredictionResult = () => {
  const location = useLocation();
  const formData = location.state;
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { showNotification, NotificationContainer } = useNotification();

  const handleFeedback = (feedback) => {
    console.log('User feedback:', feedback);
    showNotification('Thank you for your feedback!', 'success');
    // Here you can send feedback to your backend
    // api.submitFeedback(feedback);
  };

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
        // Simulate loading progress
        setLoadingProgress(25);
        const data = await getPrediction(formData);
        setLoadingProgress(75);
        setResult(data);
        const predictionsArray = Object.entries(data.predictions).map(
          ([year, level]) => ({
            date: year,
            groundwater_level: level * 25,
          })
        );
        setChartData(predictionsArray);
        setLoadingProgress(100);
        showNotification('Prediction analysis completed successfully!', 'success');
      } catch (err) {
        console.error("Error while fetching prediction:", err);
        setError("Failed to fetch prediction.");
        showNotification('Failed to fetch prediction data', 'error');
      } finally {
        setTimeout(() => setLoading(false), 500); // Small delay for smooth transition
      }
    };

    if (formData) {
      fetchPrediction();
    } else {
      setError("No input data provided.");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]); // showNotification is stable, no need to include in dependencies

  if (loading) return (
    <LoadingScreen 
      message="Analyzing Groundwater Data"
      subMessage="Processing satellite data and environmental factors..."
      progress={loadingProgress}
    />
  );
  
  if (error) return (
    <DashboardLayout title="Error" subtitle="Something went wrong">
      <div className="flex items-center justify-center py-20">
        <div className="max-w-md w-full">
          <Alert severity="error" className="shadow-2xl rounded-xl">
            <div className="flex items-center gap-3 p-4">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="font-bold text-lg">Prediction Error</h3>
                <p className="mt-1">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-3 btn-primary text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          </Alert>
        </div>
      </div>
      <NotificationContainer />
    </DashboardLayout>
  );

  const currentLevel = result?.predictions[formData.year] || 0;
  const currentDepth = currentLevel * 25;

  return (
    <DashboardLayout 
      title="Groundwater Intelligence Report" 
      subtitle="Smart predictions for sustainable water management"
    >
      <div className="space-y-8">
        {!showRecommendations ? (
          /* Main Overview Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Water Glass Visualization */}
            <div className="lg:col-span-1">
              <div className="card p-6 text-center animate-slideInLeft">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2">
                  💧 Current Water Level
                </h2>
                <WaterGlass level={currentDepth} maxLevel={150} size={280} />
                <div className="mt-6 space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">📍 {formData.latitude}°N, {formData.longitude}°E</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">Prediction Year</p>
                    <p className="font-semibold text-lg">📅 {formData.year}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Prediction Card */}
            <div className="lg:col-span-1">
              <PredictionCard 
                formData={formData}
                result={result}
                onShowRecommendations={() => {
                  setShowRecommendations(true);
                  showNotification('Loading smart recommendations...', 'info');
                }}
              />
            </div>

            {/* Right Column - Charts */}
            <div className="lg:col-span-1">
              <div className="card p-6 animate-slideInRight">
                <EnhancedCharts data={chartData} />
              </div>
            </div>
          </div>
        ) : (
          /* Recommendations View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Summary Card */}
            <div className="animate-slideInLeft">
              <div className="card p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    📊 Prediction Summary
                  </h2>
                  <WaterGlass level={currentDepth} maxLevel={150} size={220} />
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                      <p className="text-sm text-blue-600 font-medium">Year</p>
                      <p className="font-bold text-blue-800 text-lg">{formData.year}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                      <p className="text-sm text-green-600 font-medium">Level</p>
                      <p className="font-bold text-green-800 text-lg">{currentDepth.toFixed(2)} ft</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowRecommendations(false);
                      showNotification('Switched to overview mode', 'info');
                    }}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <span>←</span>
                    Back to Overview
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Interactive Recommendations */}
            <div className="animate-slideInRight">
              <InteractiveRecommendations 
                recommendations={getRecommendations(currentLevel)}
                level={currentLevel}
              />
            </div>
          </div>
        )}

        {/* Enhanced Footer Actions */}
        <div className="mt-12">
          <div className="card p-8 text-center animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              🔍 Explore More Options
            </h3>
            <p className="text-gray-600 mb-6">
              Take action based on your groundwater predictions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => showNotification('Report download started!', 'success')}
                className="btn-success flex items-center justify-center gap-2"
              >
                <span>📊</span>
                Download Report
              </button>
              <button 
                onClick={() => showNotification('Results shared successfully!', 'success')}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <span>📱</span>
                Share Results
              </button>
              <button 
                onClick={() => showNotification('Redirecting to new prediction...', 'info')}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                New Prediction
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Widget */}
      <FeedbackWidget onFeedbackSubmit={handleFeedback} />
      
      {/* Notification Container */}
      <NotificationContainer />
    </DashboardLayout>
  );
};

export default PredictionResult;