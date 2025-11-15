import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdynifyHomepage from './IdynifyHomepage.jsx';
import MountainsideICP from './MountainsideICP.jsx';
import Request from './Request.jsx';
import AdminDashboard from './AdminDashboard.jsx';  // ← NEW: Admin dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IdynifyHomepage />} />
        <Route path="/mountainside-icp" element={<MountainsideICP />} />
        <Route path="/request" element={<Request />} />
        <Route path="/admin" element={<AdminDashboard />} />  {/* ← NEW: Admin route */}
      </Routes>
    </Router>
  );
}

export default App;
