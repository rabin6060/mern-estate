// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-1ab58.firebaseapp.com",
  projectId: "mern-estate-1ab58",
  storageBucket: "mern-estate-1ab58.appspot.com",
  messagingSenderId: "315048560207",
  appId: "1:315048560207:web:c272c25d5e28e5224c0c3a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);