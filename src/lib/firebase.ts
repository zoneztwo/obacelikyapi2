// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1QUDQpnMEd9pzevUDtb1vXjYwsv_QrXo",
  authDomain: "obacelikyapi.firebaseapp.com",
  projectId: "obacelikyapi",
  storageBucket: "obacelikyapi.firebasestorage.app",
  messagingSenderId: "423823946531",
  appId: "1:423823946531:web:55e6bb936f520274b89296",
  measurementId: "G-00SYQ5RFF7"
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
