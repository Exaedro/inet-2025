import React from 'react';

const RobotAssistant: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 animate-bounce">
      <div className="bg-white rounded-full p-3 shadow-lg border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 100 100" 
          className="text-blue-600"
          fill="currentColor"
        >
          {/* Robot Head */}
          <rect x="20" y="25" width="60" height="50" rx="10" fill="#2563EB" />
          
          {/* Eyes */}
          <circle cx="35" cy="40" r="6" fill="white" />
          <circle cx="65" cy="40" r="6" fill="white" />
          <circle cx="35" cy="40" r="3" fill="#FBBF24" />
          <circle cx="65" cy="40" r="3" fill="#FBBF24" />
          
          {/* Mouth */}
          <rect x="40" y="55" width="20" height="8" rx="4" fill="white" />
          <rect x="42" y="57" width="4" height="4" fill="#2563EB" />
          <rect x="48" y="57" width="4" height="4" fill="#2563EB" />
          <rect x="54" y="57" width="4" height="4" fill="#2563EB" />
          
          {/* Antennae */}
          <line x1="35" y1="25" x2="35" y2="15" stroke="#2563EB" strokeWidth="2" />
          <line x1="65" y1="25" x2="65" y2="15" stroke="#2563EB" strokeWidth="2" />
          <circle cx="35" cy="15" r="3" fill="#FBBF24" />
          <circle cx="65" cy="15" r="3" fill="#FBBF24" />
          
          {/* Body */}
          <rect x="25" y="75" width="50" height="20" rx="5" fill="#2563EB" />
          
          {/* Arms */}
          <rect x="10" y="45" width="15" height="8" rx="4" fill="#2563EB" />
          <rect x="75" y="45" width="15" height="8" rx="4" fill="#2563EB" />
          
          {/* Control Panel */}
          <circle cx="40" cy="85" r="3" fill="#FBBF24" />
          <circle cx="50" cy="85" r="3" fill="white" />
          <circle cx="60" cy="85" r="3" fill="#10B981" />
        </svg>
      </div>
      
      {/* Speech Bubble */}
      <div className="absolute bottom-16 left-0 bg-white rounded-lg p-2 shadow-lg border border-gray-200 min-w-max opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="text-xs text-gray-600 whitespace-nowrap">
          ¡Hola! ¿Necesitas ayuda?
        </div>
        <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default RobotAssistant;