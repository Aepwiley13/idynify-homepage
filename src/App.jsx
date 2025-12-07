import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Questionnaire from './pages/Questionnaire';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 text-xl font-mono">LOADING...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/questionnaire" element={user ? <Questionnaire /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;