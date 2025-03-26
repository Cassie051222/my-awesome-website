import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_9MgVEyjfS6ARMpLC-90w9MpZfi77iT8",
  authDomain: "smarttrade-ebf80.firebaseapp.com",
  projectId: "smarttrade-ebf80",
  storageBucket: "smarttrade-ebf80.appspot.com",
  messagingSenderId: "718630899377",
  appId: "1:718630899377:web:YOUR_APP_ID" // You'll need to add your app ID from Firebase Console
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app; 