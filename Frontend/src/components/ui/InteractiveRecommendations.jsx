import React, { useState, useEffect } from 'react';

const InteractiveRecommendations = ({ recommendations, level }) => {
  const [activeTab, setActiveTab] = useState('crops');
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const getLevelIcon = (level) => {
    if (level < 4) return '🚨';
    if (level < 4.5) return '⚠️';
    return '✅';
  };

  const getLevelColor = (level) => {
    if (level < 4) return 'border-red-500 bg-red-50';
    if (level < 4.5) return 'border-yellow-500 bg-yellow-50';
    return 'border-green-500 bg-green-50';
  };

  const tabs = [
    { key: 'crops', label: '🌾 Crops', icon: '🌱' },
    { key: 'irrigation', label: '💧 Irrigation', icon: '🚰' },
    { key: 'tips', label: '💡 Tips', icon: '🌟' }
  ];

  return (
    <div className={`transform transition-all duration-700 ${animateIn ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      {/* Header with level indicator */}
      <div className={`p-4 rounded-t-lg border-2 ${getLevelColor(level)}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {getLevelIcon(level)} Recommendations
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-600">Groundwater Level</p>
            <p className="font-bold text-lg">{(level * 25).toFixed(2)} ft</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-l-2 border-r-2 border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-300 ${
              activeTab === tab.key
                ? 'bg-blue-500 text-white transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <span className="block text-lg mb-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="border-2 border-t-0 border-gray-200 rounded-b-lg bg-white min-h-[300px]">
        {/* Crops Tab */}
        {activeTab === 'crops' && (
          <div className="p-6 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🌾 Recommended Crops
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {recommendations.crops.map((crop, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200 transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-green-800">{crop}</p>
                    <p className="text-sm text-green-600">Suitable for current water level</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Irrigation Tab */}
        {activeTab === 'irrigation' && (
          <div className="p-6 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              💧 Irrigation Guidelines
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🚰</div>
                <div className="flex-1">
                  <p className="text-blue-800 leading-relaxed whitespace-pre-line">
                    {recommendations.irrigation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="p-6 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              💡 Additional Tips
            </h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🌟</div>
                <div className="flex-1">
                  <p className="text-purple-800 leading-relaxed whitespace-pre-line">
                    {recommendations.tips}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-3">
        <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
          📱 Share Results
        </button>
        <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
          📊 Export Report
        </button>
      </div>
    </div>
  );
};

export default InteractiveRecommendations;
