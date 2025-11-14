import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdynifyHomepage from './IdynifyHomepage.jsx';
import MountainsideICP from './MountainsideICP.jsx';
import RequestForm from './RequestForm.jsx'; // ← ADD THIS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IdynifyHomepage />} />
        <Route path="/mountainside-icp" element={<MountainsideICP />} />
        <Route path="/request" element={<RequestForm />} /> {/* ← ADD THIS */}
      </Routes>
    </Router>
  );
}

export default App;
