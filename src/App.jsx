import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdynifyHomepage from './IdynifyHomepage';
import MountainsideICP from './MountainsideICP';
import Request from './Request';
import AdminDashboard from './AdminDashboard';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import ICPQuestionnaire from './ICPQuestionnaire';
import ICPQuestionnaireSuccess from './ICPQuestionnaireSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IdynifyHomepage />} />
        <Route path="/mountainside-icp" element={<MountainsideICP />} />
        <Route path="/request" element={<Request />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/icp-questionnaire" element={<ICPQuestionnaire />} />
        <Route path="/icp-success" element={<ICPQuestionnaireSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
