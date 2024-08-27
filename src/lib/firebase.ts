// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXrJ_RbXg3geqL4j4dtDMp2TTawjb5FaQ",
  authDomain: "parque-mercado-central.firebaseapp.com",
  databaseURL: "https://parque-mercado-central-default-rtdb.firebaseio.com",
  projectId: "parque-mercado-central",
  storageBucket: "parque-mercado-central.appspot.com",
  messagingSenderId: "1072890136410",
  appId: "1:1072890136410:web:abdeb51ac4fd509de29563",
  measurementId: "G-4L6GHZF7EE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseDataBase = getDatabase(app);
