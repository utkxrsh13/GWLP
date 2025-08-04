import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Button2 from '../components/ui/Button2';
import Charts from '../components/Charts';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Pattern from '../components/ui/Pattern';
import WaterGlass from '../components/ui/WaterGlass';
import EnhancedCharts from '../components/ui/EnhancedCharts';
import useNotification from '../hooks/useNotification';

const chartData = [
  { date: "2020", groundwater_level: 15.2 },
  { date: "2021", groundwater_level: 14.8 },
  { date: "2022", groundwater_level: 13.9 },
  { date: "2023", groundwater_level: 13.1 },
  { date: "2024", groundwater_level: 12.5 },
  { date: "2025", groundwater_level: 11.8 },
];

const features = [
  {
    icon: '🌍',
    title: 'Global Coverage',
    description: 'Monitor groundwater levels across multiple regions with satellite data integration'
  },
  {
    icon: '🤖',
    title: 'AI Predictions',
    description: 'Advanced machine learning models provide accurate future groundwater forecasts'
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description: 'Interactive dashboards with live data visualization and trend analysis'
  },
  {
    icon: '💧',
    title: 'Water Conservation',
    description: 'Smart recommendations for sustainable water management and crop planning'
  }
];

const stats = [
  { label: 'Locations Monitored', value: '10,000+', icon: '📍' },
  { label: 'Accuracy Rate', value: '94.5%', icon: '🎯' },
  { label: 'Data Points', value: '50M+', icon: '📈' },
  { label: 'Users Served', value: '25,000+', icon: '👥' }
];

const HomePage = () => {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const { showNotification, NotificationContainer } = useNotification();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    showNotification('Welcome to GWLP! Let\'s get started with your prediction.', 'success');
  };

  const handleLearnMore = () => {
    showNotification('Exploring advanced features...', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Pattern />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-20 container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Column - Content */}
            <div className="space-y-8 animate-slideInLeft">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium">
                  🚀 Advanced AI-Powered Predictions
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Groundwater{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 animate-pulse">
                    Intelligence
                  </span>
                  {' '}Platform
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Harness the power of AI and satellite data to predict groundwater levels, 
                  optimize water usage, and make informed decisions for sustainable agriculture.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/predict" onClick={handleGetStarted}>
                  <button className="w-full sm:w-auto btn-primary text-lg px-8 py-4 flex items-center justify-center gap-3 group">
                    <span>🔮</span>
                    Start Prediction
                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </Link>
                
                <Link to="/map" onClick={handleLearnMore}>
                  <button className="w-full sm:w-auto btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-3">
                    <span>🗺️</span>
                    Explore Map
                  </button>
                </Link>
              </div>

              {/* Stats Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`text-center p-4 rounded-lg transition-all duration-500 ${
                      currentStatIndex === index 
                        ? 'bg-gradient-to-r from-blue-100 to-green-100 scale-105 shadow-lg' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="font-bold text-lg text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Interactive Demo */}
            <div className="relative animate-slideInRight">
              <div className="relative">
                {/* Lottie Animation Background */}
                {/* <div className="absolute inset-0 scale-150 opacity-60">
                  <DotLottieReact
                    src="https://lottie.host/d93fcd7a-59ec-4f9a-931e-6d55c1f22476/IaQtMVOV3I.lottie"
                    loop
                    autoplay
                  />
                </div> */}
                
                {/* Interactive Demo Card */}
                <div className="relative z-10 card p-8 backdrop-blur-sm bg-white/80">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      💧 Live Demo
                    </h3>
                    <p className="text-gray-600">Interactive groundwater visualization</p>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <WaterGlass level={75} maxLevel={150} size={200} />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Current Level</span>
                        <span className="font-bold text-blue-600">18.5 meters</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-green-600 font-bold">+2.3%</div>
                        <div className="text-gray-600">vs Last Year</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-blue-600 font-bold">94.5%</div>
                        <div className="text-gray-600">Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🌟 Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with intuitive design 
              to deliver accurate groundwater predictions and actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-slideInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Visualization Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                📈 Historical Trends & Forecasting
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Analyze historical groundwater data spanning decades and leverage 
                our AI models to forecast future trends with high accuracy.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Multi-year trend analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Seasonal pattern recognition</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Climate impact assessment</span>
                </div>
              </div>
            </div>

            <div className="card p-6 animate-slideInRight">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                📊 Sample Trend Data
              </h3>
              <EnhancedCharts data={chartData} />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <h2 className="text-4xl font-bold text-white mb-6">
              🚀 Ready to Start Your Analysis?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of researchers, farmers, and policymakers who trust 
              our platform for accurate groundwater intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/predict">
                <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3">
                  <span>🎯</span>
                  Make Your First Prediction
                </button>
              </Link>
              
              <Link to="/map">
                <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3">
                  <span>🗺️</span>
                  Explore Global Data
                </button>
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-blue-400">
              <p className="text-blue-100 text-sm">
                ✨ Free to use • 🔒 Secure & Private • 📱 Works on all devices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Container */}
      <NotificationContainer />
    </div>
  );
};


export default HomePage