import React, { useState } from 'react';
import WaterGlass from '../ui/WaterGlass.jsx';
import StatsWidget from '../ui/StatsWidget.jsx';
import LoadingScreen from '../ui/LoadingScreen.jsx';
import FeedbackWidget from '../ui/FeedbackWidget.jsx';
import useNotification from '../../hooks/useNotification.jsx';

const UIShowcase = () => {
  const [showDemo, setShowDemo] = useState({
    loading: false,
    notifications: false
  });
  
  const { showNotification, NotificationContainer } = useNotification();

  const demoStats = [
    {
      id: 'accuracy',
      label: 'Prediction Accuracy',
      value: 94.5,
      format: 'percentage',
      icon: '🎯',
      trend: 'up',
      change: '+2.1%',
      progress: 95,
      color: 'linear-gradient(90deg, #10b981, #059669)'
    },
    {
      id: 'predictions',
      label: 'Total Predictions',
      value: 1247,
      format: 'number',
      icon: '📊',
      trend: 'up',
      change: '+156',
      progress: 78
    },
    {
      id: 'users',
      label: 'Active Users',
      value: 892,
      format: 'number',
      icon: '👥',
      trend: 'up',
      change: '+23',
      progress: 62,
      color: 'linear-gradient(90deg, #3b82f6, #1d4ed8)'
    },
    {
      id: 'satisfaction',
      label: 'User Satisfaction',
      value: 4.8,
      format: 'default',
      unit: '/5.0',
      icon: '⭐',
      trend: 'up',
      change: '+0.2',
      progress: 96,
      color: 'linear-gradient(90deg, #f59e0b, #d97706)'
    },
    {
      id: 'coverage',
      label: 'Area Coverage',
      value: 25.7,
      format: 'default',
      unit: 'km²',
      icon: '🗺️',
      trend: 'up',
      change: '+3.2km²',
      progress: 85
    },
    {
      id: 'efficiency',
      label: 'Water Efficiency',
      value: 87.3,
      format: 'percentage',
      icon: '💧',
      trend: 'up',
      change: '+4.1%',
      progress: 87,
      color: 'linear-gradient(90deg, #06b6d4, #0891b2)'
    }
  ];

  const handleFeedback = (feedback) => {
    console.log('Demo feedback:', feedback);
    showNotification('Thank you for testing our feedback system!', 'success');
  };

  const triggerNotifications = () => {
    const notifications = [
      { message: 'Welcome to the enhanced UI!', type: 'success' },
      { message: 'New prediction data available', type: 'info' },
      { message: 'System performance optimized', type: 'success' },
      { message: 'Consider upgrading your plan', type: 'warning' }
    ];

    notifications.forEach((notif, index) => {
      setTimeout(() => {
        showNotification(notif.message, notif.type);
      }, index * 1000);
    });
  };

  if (showDemo.loading) {
    return (
      <LoadingScreen 
        message="Loading UI Showcase"
        subMessage="Preparing amazing visual elements..."
        progress={75}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fadeIn">
            🎨 Enhanced UI Showcase
          </h1>
          <p className="text-xl opacity-90 animate-slideInLeft">
            Experience the next generation of groundwater prediction interface
          </p>
          
          {/* Demo Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setShowDemo({ ...showDemo, loading: true })}
              className="btn-primary"
            >
              🔄 Demo Loading Screen
            </button>
            <button
              onClick={triggerNotifications}
              className="btn-success"
            >
              🔔 Test Notifications
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Water Glass Demo */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            💧 Interactive Water Level Visualization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-600">Critical Level</h3>
              <WaterGlass level={45} maxLevel={150} size={200} />
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-600">Moderate Level</h3>
              <WaterGlass level={85} maxLevel={150} size={200} />
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-600">Good Level</h3>
              <WaterGlass level={125} maxLevel={150} size={200} />
            </div>
          </div>
        </section>

        {/* Stats Dashboard */}
        <section>
          <StatsWidget 
            data={demoStats}
            title="Live Analytics Dashboard"
            className="animate-fadeIn"
          />
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card p-6 text-center animate-slideInLeft">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">High Accuracy</h3>
            <p className="text-gray-600">AI-powered predictions with 94.5% accuracy rate</p>
          </div>
          
          <div className="card p-6 text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Updates</h3>
            <p className="text-gray-600">Live data processing and instant notifications</p>
          </div>
          
          <div className="card p-6 text-center animate-slideInRight" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Global Coverage</h3>
            <p className="text-gray-600">Satellite data from around the world</p>
          </div>
        </section>

        {/* Interactive Elements Demo */}
        <section className="card p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🎮 Interactive Elements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="btn-primary">Primary Action</button>
            <button className="btn-success">Success Action</button>
            <button className="btn-secondary">Secondary Action</button>
            <button className="btn-danger">Danger Action</button>
          </div>

          <div className="mt-8 space-y-4">
            <div className="input-field">
              <input type="text" placeholder="Enhanced input field with focus effects" />
            </div>
            
            <div className="progress-bar">
              <div className="progress-fill animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
        </section>

        {/* Animation Showcase */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            ✨ Smooth Animations
          </h2>
          
          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-16 h-16 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-16 h-16 bg-green-500 rounded-full animate-float"></div>
            <div className="w-16 h-16 bg-yellow-500 rounded-full animate-glow"></div>
          </div>
          
          <p className="text-gray-600">
            All animations are hardware-accelerated for smooth performance
          </p>
        </section>
      </div>

      {/* Feedback Widget */}
      <FeedbackWidget onFeedbackSubmit={handleFeedback} />
      
      {/* Notification Container */}
      <NotificationContainer />
      
      {/* Loading Demo Control */}
      {showDemo.loading && (
        <div className="fixed inset-0 z-50">
          <LoadingScreen 
            message="Showcase Loading Demo"
            subMessage="This is how loading screens look now..."
            progress={100}
          />
          <button
            onClick={() => setShowDemo({ ...showDemo, loading: false })}
            className="fixed top-4 right-4 z-50 btn-danger"
          >
            Close Demo
          </button>
        </div>
      )}
    </div>
  );
};

export default UIShowcase;
