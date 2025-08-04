import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ value, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className="font-bold text-2xl">
      {count.toFixed(2)}{suffix}
    </span>
  );
};

const PredictionCard = ({ formData, result, onShowRecommendations }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentLevel = result?.predictions[formData.year] || 0;
  const currentDepth = currentLevel * 25;

  const getStatusColor = (level) => {
    if (level < 4) return 'text-red-600';
    if (level < 4.5) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusText = (level) => {
    if (level < 4) return 'Critical';
    if (level < 4.5) return 'Moderate';
    return 'Good';
  };

  const getStatusIcon = (level) => {
    if (level < 4) return '🚨';
    if (level < 4.5) return '⚠️';
    return '✅';
  };

  return (
    <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🌍 Prediction Results
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span>📍</span>
            <span>{formData.latitude}°N, {formData.longitude}°E</span>
          </div>
        </div>

        {/* Main Prediction Display */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Predicted Groundwater Level ({formData.year})</p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">{getStatusIcon(currentLevel)}</span>
              <AnimatedCounter value={currentDepth} suffix=" feet" />
            </div>
            <p className={`text-lg font-semibold ${getStatusColor(currentLevel)}`}>
              {getStatusText(currentLevel)} Level
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">📊</div>
            <p className="text-sm text-gray-600">Accuracy</p>
            <p className="font-bold text-lg text-green-600">94.5%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">🎯</div>
            <p className="text-sm text-gray-600">Confidence</p>
            <p className="font-bold text-lg text-blue-600">High</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onShowRecommendations}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
        >
          <span>🌱</span>
          View Smart Recommendations
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default PredictionCard;
