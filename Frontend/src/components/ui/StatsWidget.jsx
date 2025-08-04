import React, { useState, useEffect } from 'react';

const StatsWidget = ({ data, title, className = "" }) => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Animate values
    const timer = setTimeout(() => {
      setAnimatedValues(data.reduce((acc, item) => {
        acc[item.id] = item.value;
        return acc;
      }, {}));
    }, 300);

    return () => clearTimeout(timer);
  }, [data]);

  const formatValue = (value, format) => {
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'number':
        return value.toLocaleString();
      default:
        return value;
    }
  };

  return (
    <div className={`card p-6 ${className} transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      {title && (
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          {title}
        </h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{item.icon}</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.trend === 'up' ? 'bg-green-100 text-green-800' :
                item.trend === 'down' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item.trend === 'up' ? '↗️' : item.trend === 'down' ? '↘️' : '➡️'}
                {item.change && ` ${item.change}`}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-medium">{item.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-800">
                  {formatValue(animatedValues[item.id] || 0, item.format)}
                </span>
                {item.unit && (
                  <span className="text-sm text-gray-500 mb-1">{item.unit}</span>
                )}
              </div>
              
              {item.progress && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${item.progress}%`,
                        background: item.color || 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsWidget;
