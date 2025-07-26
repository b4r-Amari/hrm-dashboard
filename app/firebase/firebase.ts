// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwaqC4Bab2awTHgOSivfRP4EFntKkkhwk",
  authDomain: "hrm-dashboard-d5023.firebaseapp.com",
  projectId: "hrm-dashboard-d5023",
  storageBucket: "hrm-dashboard-d5023.firebasestorage.app",
  messagingSenderId: "410725722727",
  appId: "1:410725722727:web:9b715ec20c94827ca802c2",
  measurementId: "G-8HFBGEP4BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);