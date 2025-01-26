import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD1Ze35LZQzdsMV-qyw-ksFCE5Eg2MC-Q",
  authDomain: "pocket-class-booking-system.firebaseapp.com",
  projectId: "pocket-class-booking-system",
  storageBucket: "pocket-class-booking-system.firebasestorage.app",
  messagingSenderId: "259986748132",
  appId: "1:259986748132:web:328e28d1bf84b1eb4db2f1",
  measurementId: "G-3SCFEQL70P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth();
auth.useDeviceLanguage(); // Set language to device language

// Initialize Firestore
const db = getFirestore();

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Initialize Analytics
let analytics = null;
isSupported().then(yes => yes ? analytics = getAnalytics(app) : null);

export { auth, db, analytics, googleProvider };
