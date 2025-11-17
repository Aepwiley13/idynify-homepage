// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6svgcZDy09skaH2HOleXvQrKqRbokSD4",
  authDomain: "idynify-icp.firebaseapp.com",
  projectId: "idynify-icp",
  storageBucket: "idynify-icp.firebasestorage.app",
  messagingSenderId: "828638115993",
  appId: "1:828638115993:web:837f6dcdac81828f6b2008",
  measurementId: "G-BHH6FHQQBY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;