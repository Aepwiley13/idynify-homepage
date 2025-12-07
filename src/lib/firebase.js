import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration - Using environment variables from .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// 🔍 TEMPORARY DEBUG - Remove after testing
console.log('🔍 DEBUG: Raw env check:');
console.log('VITE_FIREBASE_API_KEY from env:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log('Type:', typeof import.meta.env.VITE_FIREBASE_API_KEY);
console.log('Length:', import.meta.env.VITE_FIREBASE_API_KEY?.length);
console.log('First 10 chars:', import.meta.env.VITE_FIREBASE_API_KEY?.substring(0, 10));
console.log('All VITE_ env vars:', Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));

// Debug: Check if config is loaded properly
console.log('🔥 Firebase Configuration Check:');
console.log('API Key loaded:', !!firebaseConfig.apiKey);
console.log('API Key prefix:', firebaseConfig.apiKey?.substring(0, 10) + '...');
console.log('Project ID:', firebaseConfig.projectId);
console.log('Auth Domain:', firebaseConfig.authDomain);

// Verify critical config exists
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'removed') {
  console.error('❌ CRITICAL: Firebase API key is missing or invalid!');
  console.error('Current apiKey value:', firebaseConfig.apiKey);
  console.error('');
  console.error('Fix this by:');
  console.error('1. Check your .env file in project root');
  console.error('2. Make sure VITE_FIREBASE_API_KEY is set correctly');
  console.error('3. Restart your dev server (npm run dev)');
  throw new Error('Firebase API key not configured properly');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Temporarily disabled analytics
export const analytics = null;

export default app;