import React from 'react';

const Level1Page3 = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">Navigation Components</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">The Link Component</h2>
        <p className="text-gray-700 mb-4">
          The Link component is the primary way to create navigation links in React Router. It renders an anchor tag that updates the URL without refreshing the page:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm text-purple-600">
{`import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}`}
          </pre>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">The NavLink Component</h2>
        <p className="text-gray-700 mb-4">
          NavLink is a special version of Link that adds styling attributes to the rendered element when it matches the current URL:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm text-purple-600">
{`import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink 
        to="/"
        className={({ isActive }) => 
          isActive ? "text-purple-600" : "text-gray-600"
        }
      >
        Home
      </NavLink>
    </nav>
  );
}`}
          </pre>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">Programmatic Navigation</h2>
        <p className="text-gray-700 mb-4">
          Sometimes you need to navigate programmatically, for example after a form submission. You can use the useNavigate hook for this:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm text-purple-600">
{`import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Level1Page3;
