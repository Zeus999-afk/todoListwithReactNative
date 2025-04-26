// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyvtow65Y-tk58mtCPYeXJ6u4Gpox6ib4",
  authDomain: "todolist-a7ffd.firebaseapp.com",
  projectId: "todolist-a7ffd",
  storageBucket: "todolist-a7ffd.firebasestorage.app",
  messagingSenderId: "503490870722",
  appId: "1:503490870722:web:da5f2e2e2f6cbcc18baa5b",
  measurementId: "G-D0YH9CSZ95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);