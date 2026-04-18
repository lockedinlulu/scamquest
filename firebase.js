import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAT8qxu_oKlhY0CeeA-NT2G6wKbTBppZBc", // ✅ REAL KEY
  authDomain: "scam-game-2ceba.firebaseapp.com",
  projectId: "scam-game-2ceba",
  storageBucket: "scam-game-2ceba.appspot.com", // fix this too
  messagingSenderId: "638074954476",
  appId: "1:638074954476:web:7e7fffda37faa9c477fbc9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signupUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export { app, auth, db };

