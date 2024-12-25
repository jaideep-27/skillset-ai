import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getAnalytics, isSupported } from '@firebase/analytics';

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

console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

// Initialize Analytics if supported
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
    console.log("Firebase Analytics initialized");
  } else {
    console.log("Firebase Analytics is not supported on this environment");
  }
});

export { app, auth, db };
