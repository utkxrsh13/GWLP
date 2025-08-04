import React, { useState, useEffect, useCallback } from 'react';

const NotificationToast = ({ message, type = 'success', duration = 3000, onClose, index = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progressWidth, setProgressWidth] = useState(100);

  useEffect(() => {
    // Animate in with a small delay
    const enterTimer = setTimeout(() => setIsVisible(true), index * 100 + 100);
    
    // Start progress bar countdown
    const progressTimer = setTimeout(() => {
      setProgressWidth(0);
    }, index * 100 + 200);
    
    // Animate out before duration ends
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 400);
    }, duration + (index * 100));

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(progressTimer);
      clearTimeout(exitTimer);
    };
  }, [duration, onClose, index]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-green-600 border-green-700 shadow-green-200';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-red-600 border-red-700 shadow-red-200';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-700 shadow-yellow-200';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-700 shadow-blue-200';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 border-gray-700 shadow-gray-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div 
      className={`transform transition-all duration-500 ease-out ${
        isVisible && !isExiting 
          ? 'translate-x-0 opacity-100 scale-100' 
          : isExiting 
            ? '-translate-x-full opacity-0 scale-95'
            : 'translate-x-full opacity-0 scale-95'
      }`}
      style={{ transitionDelay: isVisible ? '0ms' : `${index * 50}ms` }}
    >
      <div
        className={`${getTypeStyles()} text-white px-6 py-4 rounded-xl shadow-2xl border-l-4 flex items-center space-x-3 min-w-[320px] max-w-md backdrop-blur-sm`}
      >
        <div className="flex-shrink-0">
          <span className="text-2xl animate-bounce">{getIcon()}</span>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm leading-tight">{message}</p>
          <div className="mt-1 bg-white bg-opacity-20 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-white transition-all ease-linear"
              style={{ 
                width: `${progressWidth}%`,
                transition: `width ${duration - 500}ms linear`
              }}
            />
          </div>
        </div>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(onClose, 400);
          }}
          className="flex-shrink-0 text-white hover:text-gray-200 transition-all duration-200 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-white hover:bg-opacity-20"
        >
          <span className="text-lg font-bold">×</span>
        </button>
      </div>
    </div>
  );
};

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const showNotification = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random(); // More unique ID
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after duration + animation time
    setTimeout(() => {
      removeNotification(id);
    }, duration + 1000);
  }, [removeNotification]);

  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {notifications.map((notification, index) => (
        <NotificationToast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          index={index}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );

  return { showNotification, NotificationContainer };
};

export default useNotification;
