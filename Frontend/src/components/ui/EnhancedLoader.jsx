import React from 'react';

const EnhancedLoader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Animated Water Drops */}
      <div className="relative">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.4s'
              }}
            ></div>
          ))}
        </div>
        
        {/* Ripple effect */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-2 border-blue-300 rounded-full animate-ping"></div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 animate-pulse">
          {message}
        </h3>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default EnhancedLoader;
