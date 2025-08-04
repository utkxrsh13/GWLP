import React from 'react';
import useNotification from '../../hooks/useNotification.jsx';

const NotificationTest = () => {
  const { showNotification, NotificationContainer } = useNotification();

  const testNotifications = () => {
    showNotification('Success! Your prediction was completed.', 'success');
    
    setTimeout(() => {
      showNotification('Warning: Water level is critically low.', 'warning');
    }, 500);
    
    setTimeout(() => {
      showNotification('Info: New data available for analysis.', 'info');
    }, 1000);
    
    setTimeout(() => {
      showNotification('Error: Unable to fetch satellite data.', 'error');
    }, 1500);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🔔 Notification System Test
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Notifications</h2>
          <p className="text-gray-600 mb-6">
            Click the button below to test different types of notifications
          </p>
          
          <button
            onClick={testNotifications}
            className="btn-primary"
          >
            🚀 Test All Notification Types
          </button>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => showNotification('Operation completed successfully!', 'success')}
              className="btn-success"
            >
              ✅ Success Notification
            </button>
            
            <button
              onClick={() => showNotification('Please check your input data.', 'warning')}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              ⚠️ Warning Notification
            </button>
            
            <button
              onClick={() => showNotification('New features are now available.', 'info')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              ℹ️ Info Notification
            </button>
            
            <button
              onClick={() => showNotification('Something went wrong. Please try again.', 'error')}
              className="btn-danger"
            >
              ❌ Error Notification
            </button>
          </div>
        </div>
      </div>
      
      <NotificationContainer />
    </div>
  );
};

export default NotificationTest;
