import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ message = "Loading...", subMessage = "", progress = 0 }) => {
  const [dots, setDots] = useState('');
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentProgress(progress);
    }, 300);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center z-50">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-green-200 rounded-full opacity-15 animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Main loading animation */}
        <div className="mb-8">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-32 h-32 mx-auto border-4 border-blue-200 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Inner elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse flex items-center justify-center">
                <span className="text-white text-2xl animate-bounce">💧</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {message}{dots}
          </h2>
          {subMessage && (
            <p className="text-gray-600 animate-pulse">{subMessage}</p>
          )}
        </div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="mb-6">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{currentProgress}% Complete</p>
          </div>
        )}

        {/* Loading steps animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>

        {/* Shimmer effect */}
        <div className="mt-8 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
