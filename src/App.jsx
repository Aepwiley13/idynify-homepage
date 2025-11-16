import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdynifyHomepage from './IdynifyHomepage.jsx';
import MountainsideICP from './MountainsideICP.jsx';
import Request from './pages/Request.jsx';
import Dashboard from './Dashboard.jsx';
import ICPQuestionnaire from './ICPQuestionnaire.jsx';
import ICPQuestionnaireSuccess from './ICPQuestionnaireSuccess.jsx';

// Temporarily commenting out files we don't have yet
// import AdminDashboard from './AdminDashboard.jsx';
// import Signup from './Signup.jsx';
// import Login from './Login.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IdynifyHomepage />} />
        <Route path="/mountainside-icp" element={<MountainsideICP />} />
        <Route path="/request" element={<Request />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/icp-questionnaire" element={<ICPQuestionnaire />} />
        <Route path="/icp-success" element={<ICPQuestionnaireSuccess />} />
        {/* We'll add these routes later when we have the files */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
