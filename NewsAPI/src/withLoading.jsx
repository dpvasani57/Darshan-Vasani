import React, { useState, useCallback } from 'react';

function Spinner() {
  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <div className="spinner" style={{ margin: '0 auto', width: 40, height: 40, border: '4px solid #ccc', borderTop: '4px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(false);
    
    const setLoadingState = useCallback((state) => {
      setLoading(state);
    }, []);

    if (loading) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} loading={loading} setLoading={setLoadingState} />;
  };
};

export default withLoading; 