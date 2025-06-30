import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong.</h1>
          <p className="text-lg text-gray-700 mb-6">
            We're sorry for the inconvenience. Please try again later.
          </p>
          <details className="w-full max-w-2xl text-left bg-white p-4 rounded-lg shadow mb-6">
            <summary className="font-semibold cursor-pointer">Error Details</summary>
            <pre className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 