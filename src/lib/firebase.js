import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAG6vgoZhyDskmaHzHO1eXvQrKqa0okSD4",
  authDomain: "idynify-icp.firebaseapp.com",
  projectId: "idynify-icp",
  storageBucket: "idynify-icp.firebasestorage.app",
  messagingSenderId: "828638115993",
  appId: "1:828638115993:web:837f6dc6ac81828f6b2008",
  measurementId: "G-80H6FHQQ0Y"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
