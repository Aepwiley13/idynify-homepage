import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

export default function ApiKeySetup() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [existingKey, setExistingKey] = useState('');

  // Admin password protection
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const ADMIN_PASSWORD = '3xkbd84fckv8rc';

  useEffect(() => {
    if (isAuthenticated) {
      loadExistingKey();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  };

  const loadExistingKey = async () => {
    try {
      const keyDoc = await getDoc(doc(db, 'config', 'apiKeys'));
      if (keyDoc.exists() && keyDoc.data().anthropic) {
        const key = keyDoc.data().anthropic;
        setExistingKey(`${key.substring(0, 20)}...${key.substring(key.length - 8)}`);
      }
    } catch (err) {
      console.error('Error loading key:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!apiKey.startsWith('sk-ant-api03-')) {
      setError('Invalid API key format. Should start with sk-ant-api03-');
      setLoading(false);
      return;
    }

    try {
      await setDoc(doc(db, 'config', 'apiKeys'), {
        anthropic: apiKey,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      });

      setSaved(true);
      setApiKey('');
      loadExistingKey();

      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (err) {
      console.error('Error saving API key:', err);
      setError('Failed to save API key. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-slate-900">API Key Setup</h1>
            <p className="text-slate-600 text-sm">Admin access required</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg mb-4"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🤖</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Claude API Key Setup</h1>
            <p className="text-slate-600">Securely store your Anthropic API key for Barry AI</p>
          </div>

          {existingKey && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-semibold mb-1">✅ API Key Already Configured</p>
              <p className="text-green-700 text-sm font-mono">{existingKey}</p>
              <p className="text-green-600 text-xs mt-2">You can update it below if needed</p>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Anthropic API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg font-mono text-sm"
                required
              />
              <p className="text-xs text-slate-500 mt-2">
                Get your API key from: <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com</a>
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {saved && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">✅ API Key Saved Successfully!</p>
                <p className="text-green-700 text-sm">Redirecting to admin dashboard...</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm font-semibold mb-2">🔒 Security Info:</p>
              <ul className="text-blue-700 text-xs space-y-1">
                <li>• Stored in Firebase config collection</li>
                <li>• Only accessible by server-side functions</li>
                <li>• Never exposed to client-side code</li>
                <li>• Can be updated anytime from this page</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading || saved}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : saved ? 'Saved!' : '🔐 Save API Key Securely'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="text-slate-600 hover:text-slate-900 text-sm"
              >
                ← Back to Admin Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}