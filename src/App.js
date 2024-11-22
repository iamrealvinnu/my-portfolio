import React from 'react';
import ConstructionOverlay from './components/ConstructionOverlay';

function App() {
  // Remove all state management and just render the overlay
  return (
    <>
      <ConstructionOverlay />
      {/* Your existing app content */}
    </>
  );
}

export default App;
