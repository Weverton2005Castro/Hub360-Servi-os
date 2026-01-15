import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC33GQ6BIo0f1kRWPqAHnMMYChTIhPCWRs",
  authDomain: "sas-fb.firebaseapp.com",
  projectId: "sas-fb",
  storageBucket: "sas-fb.firebasestorage.app",
  messagingSenderId: "355098049490",
  appId: "1:355098049490:web:d2bbc1cb7cbad05b71a60b",
  measurementId: "G-VZVZ2GBLES"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);