import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdynifyHomepage from './IdynifyHomepage.jsx';
import MountainsideICP from './MountainsideICP.jsx';
import Request from './pages/Request.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import Dashboard from './Dashboard.jsx';
import ICPQuestionnaire from './ICPQuestionnaire.jsx';
import ICPQuestionnaireSuccess from './ICPQuestionnaireSuccess.jsx';
import ApiKeySetup from './pages/ApiKeySetup.jsx';
import UserICPView from './components/UserICPView.jsx'; // ← NEW

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<IdynifyHomepage />} />
        <Route path="/mountainside-icp" element={<MountainsideICP />} />
        <Route path="/request" element={<Request />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/icp" element={<UserICPView />} /> {/* ← NEW */}
        <Route path="/icp-questionnaire" element={<ICPQuestionnaire />} />
        <Route path="/icp-success" element={<ICPQuestionnaireSuccess />} />
        <Route path="/api-setup" element={<ApiKeySetup />} />
      </Routes>
    </Router>
  );
}

export default App;