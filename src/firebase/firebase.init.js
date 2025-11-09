// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHt9Kmq6QGBmz2SsnQhjZh0iuxBXVHkHA",
  authDomain: "social-development-ce2ef.firebaseapp.com",
  projectId: "social-development-ce2ef",
  storageBucket: "social-development-ce2ef.firebasestorage.app",
  messagingSenderId: "1034536506999",
  appId: "1:1034536506999:web:f6bd4a37f73efe24b21872"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);