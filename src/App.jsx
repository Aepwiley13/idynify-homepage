import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdynifyHomepage from './IdynifyHomepage.jsx';
import MountainsideICP from './MountainsideICP.jsx';
import Request from './pages/Request.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import Dashboard from './Dashboard.jsx';
import ICPQuestionnaire from './ICPQuestionnaire.jsx';
import ICPQuestionnaireSuccess from './ICPQuestionnaireSuccess.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IdynifyHomepage />} />
        <Route path="/mountainside-icp" element={<MountainsideICP />} />
        <Route path="/request" element={<Request />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/icp-questionnaire" element={<ICPQuestionnaire />} />
        <Route path="/icp-success" element={<ICPQuestionnaireSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;