import React from 'react';

const NoPageFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NoPageFound;
