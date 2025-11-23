// Temporary test file - delete after testing
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6GvgoZhyDsknaHzH8ioXvQrKqa8okSD4",
  authDomain: "idynify-icp.firebaseapp.com",
  projectId: "idynify-icp",
  storageBucket: "idynify-icp.firebasestorage.app",
  messagingSenderId: "828638115993",
  appId: "1:828638115993:web:837f6dc6ac81828f6b2008"
};

console.log('🧪 Testing Firebase API access...');

const app = initializeApp(firebaseConfig, 'test');
const auth = getAuth(app);

// Try to create a test user
createUserWithEmailAndPassword(auth, 'apitest@test.com', 'testpass123')
  .then(() => console.log('✅ API KEY WORKS! Auth is enabled.'))
  .catch(err => {
    if (err.code === 'auth/email-already-in-use') {
      console.log('✅ API KEY WORKS! (Email already exists, which is fine)');
    } else if (err.code === 'auth/api-key-not-valid') {
      console.error('❌ API Key is invalid or restricted');
      console.error('Go to Google Cloud Console and:');
      console.error('1. Enable Identity Toolkit API');
      console.error('2. Check API key restrictions');
    } else {
      console.error('❌ Other error:', err.code, err.message);
    }
  });