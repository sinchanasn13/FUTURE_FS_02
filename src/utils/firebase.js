// src/utils/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Missing import added
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ Auth-related imports

// ✅ Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoOdCYdanb6BRb2PU_LjTHW2VbbXFQsrw",
  authDomain: "eshopy-1af9c.firebaseapp.com",
  projectId: "eshopy-1af9c",
  storageBucket: "eshopy-1af9c.appspot.com", // ✅ Corrected
  messagingSenderId: "357544422101",
  appId: "1:357544422101:web:0179aef22ad4f84db3105c"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore database
const db = getFirestore(app);

// ✅ Initialize Firebase Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Export everything needed
export { db, auth, googleProvider };
