import React, { useState, useEffect } from 'react';

const DashboardLayout = ({ children, title, subtitle }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-green-200 to-green-300 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Enhanced header */}
        <header className={`bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-2xl transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-1 animate-slideInLeft">
                    {title || "Groundwater Intelligence"}
                  </h1>
                  <p className="text-xl opacity-90 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
                    {subtitle || "Smart predictions for sustainable water management"}
                  </p>
                </div>
              </div>

              {/* Header actions */}
              <div className="flex items-center space-x-4 animate-slideInRight">
                <button className="p-3 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm">
                  <span className="text-xl">🔔</span>
                </button>
                <button className="p-3 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm">
                  <span className="text-xl">⚙️</span>
                </button>
                <button className="p-3 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm">
                  <span className="text-xl">👤</span>
                </button>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-6 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
              <div className="h-full bg-white animate-shimmer"></div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className={`max-w-7xl mx-auto px-6 py-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '0.3s' }}>
          {children}
        </main>

        {/* Enhanced footer */}
        <footer className={`bg-gray-900 text-white py-8 mt-16 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionDelay: '0.5s' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <span>🌍</span>
                  <span>GWLP</span>
                </h3>
                <p className="text-gray-400">
                  Advanced groundwater level prediction using machine learning for sustainable agriculture.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Predictions</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <span>📧</span>
                  </button>
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <span>🐦</span>
                  </button>
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <span>💼</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
              <p>&copy; 2025 Groundwater Level Prediction. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
