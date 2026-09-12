import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyB3MfsnxlL4JWSf0qgw31KKUKRIS435m54",
  authDomain: "e-commerce-58781.firebaseapp.com",
  databaseURL: "https://e-commerce-58781-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-commerce-58781",
  storageBucket: "e-commerce-58781.firebasestorage.app",
  messagingSenderId: "842452802461",
  appId: "1:842452802461:web:27616c5a787199d7462d74",
  measurementId: "G-MN5YB2P94V"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
