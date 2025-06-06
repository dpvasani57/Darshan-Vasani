import React from 'react';

const Level1Page2 = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">Setting Up React Router</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">Installation</h2>
        <p className="text-gray-700 mb-4">
          To get started with React Router, you first need to install it in your project. You can do this using npm or yarn:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <code className="text-sm text-purple-600">
            npm install react-router-dom
          </code>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">Basic Setup</h2>
        <p className="text-gray-700 mb-4">
          The first step is to wrap your application with the BrowserRouter component. This provides the routing context to your entire application:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm text-purple-600">
{`import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Your app components */}
    </BrowserRouter>
  );
}`}
          </pre>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">Creating Routes</h2>
        <p className="text-gray-700 mb-4">
          After setting up the router, you can define your routes using the Routes and Route components:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm text-purple-600">
{`import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Level1Page2;
