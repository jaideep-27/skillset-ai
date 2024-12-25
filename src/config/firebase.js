import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getAnalytics, isSupported } from '@firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD1Ze35LZQzdsMV-qyw-ksFCE5Eg2MC-Q",
  authDomain: "pocket-class-booking-system.firebaseapp.com",
  projectId: "pocket-class-booking-system",
  storageBucket: "pocket-class-booking-system.appspot.com",
  messagingSenderId: "259986748132",
  appId: "1:259986748132:web:328e28d1bf84b1eb4db2f1",
  measurementId: "G-3SCFEQL70P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics
let analytics = null;
isSupported().then(yes => yes ? analytics = getAnalytics(app) : null);

export { auth, db, analytics, googleProvider };
