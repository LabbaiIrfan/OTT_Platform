import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN8lMvNKiKZ8N2FgAJ0YlJsW4-plMlpSQ",
  authDomain: "ott-platform-39f25.firebaseapp.com",
  projectId: "ott-platform-39f25",
  storageBucket: "ott-platform-39f25.firebasestorage.app",
  messagingSenderId: "679111474544",
  appId: "1:679111474544:web:76c1b65ef7cd26d9d163b5",
  measurementId: "G-RQ0G1YHKLH"
};
export const FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(FirebaseApp);
const analytics = getAnalytics(FirebaseApp);
