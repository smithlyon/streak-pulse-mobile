import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA1wZM3350XEIK1GB36cpPGaTDfPrgXRNw",
  authDomain: "daily-pulse-tracker.firebaseapp.com",
  projectId: "daily-pulse-tracker",
  storageBucket: "daily-pulse-tracker.firebasestorage.app",
  messagingSenderId: "21406876180",
  appId: "1:21406876180:web:a539012347febde54f9d01",
  measurementId: "G-EQJ8200CCQ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
