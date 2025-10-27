// Frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewHome from './pages/NewHome';
// Import other pages here as you create them

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NewHome />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
