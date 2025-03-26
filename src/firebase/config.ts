import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_9MgVEyjfS6ARMpLC-90w9MpZfi77iT8",
  authDomain: "smarttrade-ebf80.firebaseapp.com",
  projectId: "smarttrade-ebf80",
  storageBucket: "smarttrade-ebf80.appspot.com",
  messagingSenderId: "718630899377",
  appId: "1:718630899377:web:a83c940e5ad02d7bb8bdba" // Updated with a valid app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    console.error("Firestore persistence failed to enable:", err.code);
  });

// Initialize Auth
export const auth = getAuth(app);

export default app; 