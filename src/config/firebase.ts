import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Configuration Firebase (valeurs en dur)
const firebaseConfig = {
  apiKey: 'AIzaSyApG8x71Jrqkiafk_nTQBdlKvLI5cMRzBw',
  authDomain: 'serverscore-cef85.firebaseapp.com',
  projectId: 'serverscore-cef85',
  storageBucket: 'serverscore-cef85.firebasestorage.app',
  messagingSenderId: '674916657589',
  appId: '1:674916657589:web:4992c3659547537dab11fc',
  measurementId: 'G-RV2CGPNYZJ',
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialiser Analytics (uniquement côté client)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };