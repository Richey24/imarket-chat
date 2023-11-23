import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8W6VIMy_0Igc3Q_jSd6HDwEFmW-NQMUY",
  authDomain: "market-chat-c7675.firebaseapp.com",
  projectId: "market-chat-c7675",
  storageBucket: "market-chat-c7675.appspot.com",
  messagingSenderId: "755632062245",
  appId: "1:755632062245:web:b76e36761d04df5b0124cc",
  measurementId: "G-PBHED82CLX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app)
