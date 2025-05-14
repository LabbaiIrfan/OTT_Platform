import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  
  // Suggestions for related content a user might want to explore
  const suggestions = [
    "Popular Shows",
    "New Releases",
    "Continue Watching",
    "Recommended For You"
  ];
  
  // Auto-redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        
        {/* Header Section */}
        <div className="p-8 text-center border-b border-gray-700">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-64 h-64 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-red-500 text-9xl font-black tracking-tighter relative">404</h1>
          </div>
          <h2 className="text-white text-3xl font-bold mb-4">This content is unavailable</h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            The page you're looking for might have been moved, deleted, or maybe never existed in the first place.
          </p>
          
          {/* Pulse animation for the auto-redirect countdown */}
          <div className="mb-8">
            <p className="text-gray-400 text-sm">
              Returning to home in <span className="text-red-500 font-bold">{countdown}</span> seconds
            </p>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-red-600 h-1.5 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown/10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Actions Section */}
        <div className="p-8 bg-gray-900 bg-opacity-50">
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex justify-center items-center bg-red-600 hover:bg-red-700 text-white font-medium text-lg px-6 py-3 rounded-lg transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Return to Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex justify-center items-center border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium text-lg px-6 py-3 rounded-lg transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Go Back
            </button>
          </div>
          
          {/* Content Suggestions */}
          <div className="mt-8">
            <h3 className="text-white text-lg font-semibold mb-4">Explore Instead</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`/${suggestion.toLowerCase().replace(/\s+/g, '-')}`)}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 text-center transition-all duration-200"
                >
                  <p className="text-white text-sm font-medium">{suggestion}</p>
                </button>
              ))}
            </div>
          </div>
          
          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Need help? <button className="text-red-400 hover:text-red-300 font-medium">Contact Support</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;