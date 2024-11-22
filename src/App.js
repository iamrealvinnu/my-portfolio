import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './components/AppContent';
import ConstructionOverlay from './components/ConstructionOverlay';

function App() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Hide overlay after 8 seconds (matching animation duration)
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {showOverlay && <ConstructionOverlay />}
      <AppContent />
    </Router>
  );
}

export default App;
