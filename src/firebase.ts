// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaFjz90C9VftaujY-hcMCKjtbKdxxGArM",
  authDomain: "viewnamesformusic.firebaseapp.com",
  projectId: "viewnamesformusic",
  storageBucket: "viewnamesformusic.firebasestorage.app",
  messagingSenderId: "797756052377",
  appId: "1:797756052377:web:31a763ec6949cab3bdf908"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
