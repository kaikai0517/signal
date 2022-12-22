import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  getDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDtj8g_7IHyg1E-_5HRNQeWhAyiqxHkc1o",
  authDomain: "signal-d494c.firebaseapp.com",
  projectId: "signal-d494c",
  storageBucket: "signal-d494c.appspot.com",
  messagingSenderId: "323749966958",
  appId: "1:323749966958:web:1c7d8a3524d12b312b627f",
  measurementId: "G-H0F7NMDYHB",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {
  db,
  auth,
  serverTimestamp,
  getDoc,
  query,
  doc,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  orderBy,
};
