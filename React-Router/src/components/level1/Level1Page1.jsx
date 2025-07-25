import React from 'react';

const Level1Page1 = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">Introduction to React Router</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">What is React Router?</h2>
        <p className="text-gray-700 mb-4">
          React Router is a standard library for routing in React applications. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.
        </p>
        <p className="text-gray-700">
          Think of React Router as the navigation system of your React application. Just like how you use maps to navigate in the real world, React Router helps users navigate through different parts of your application.
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">Key Concepts</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Routes: Define the mapping between URLs and components</li>
          <li>Links: Create navigation links in your application</li>
          <li>Navigation: Programmatically change routes</li>
          <li>Nested Routes: Create complex routing hierarchies</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">Why Use React Router?</h2>
        <p className="text-gray-700">
          React Router is essential for creating single-page applications (SPAs) where you want to maintain different URLs for different views without reloading the page. It helps create a more native app-like experience in web applications.
        </p>
      </div>
    </div>
  );
};

export default Level1Page1;
