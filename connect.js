import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyvtow65Y-tk58mtCPYeXJ6u4Gpox6ib4",
  authDomain: "todolist-a7ffd.firebaseapp.com",
  projectId: "todolist-a7ffd",
  storageBucket: "todolist-a7ffd.firebasestorage.app",
  messagingSenderId: "503490870722",
  appId: "1:503490870722:web:da5f2e2e2f6cbcc18baa5b",
  measurementId: "G-D0YH9CSZ95"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
