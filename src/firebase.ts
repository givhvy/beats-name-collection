// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate Firebase configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase configuration is missing! Check your environment variables.');
  console.error('Required env vars:', {
    VITE_FIREBASE_API_KEY: firebaseConfig.apiKey ? '✅' : '❌',
    VITE_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain ? '✅' : '❌',
    VITE_FIREBASE_PROJECT_ID: firebaseConfig.projectId ? '✅' : '❌',
    VITE_FIREBASE_STORAGE_BUCKET: firebaseConfig.storageBucket ? '✅' : '❌',
    VITE_FIREBASE_MESSAGING_SENDER_ID: firebaseConfig.messagingSenderId ? '✅' : '❌',
    VITE_FIREBASE_APP_ID: firebaseConfig.appId ? '✅' : '❌',
  });
}

console.log('🔥 Initializing Firebase with project:', firebaseConfig.projectId);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
