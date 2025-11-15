import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdynifyHomepage from './IdynifyHomepage.jsx';
import MountainsideICP from './MountainsideICP.jsx';
import Request from './Request.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';  // ← NEW

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IdynifyHomepage />} />
        <Route path="/mountainside-icp" element={<MountainsideICP />} />
        <Route path="/request" element={<Request />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />  {/* ← NEW */}
      </Routes>
    </Router>
  );
}

export default App;
