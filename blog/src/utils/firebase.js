// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-cf665.firebaseapp.com",
  projectId: "blog-cf665",
  storageBucket: "blog-cf665.firebasestorage.app",
  messagingSenderId: "447332559578",
  appId: "1:447332559578:web:c40ca70f094c3e629713e3",
  measurementId: "G-K4S217Y7KW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);