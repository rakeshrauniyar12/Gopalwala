// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu81EoGbPyJUiRSGlTLWYJcAGr6K8MSF8",
  authDomain: "gowpala-a665a.firebaseapp.com",
  projectId: "gowpala-a665a",
  storageBucket: "gowpala-a665a.firebasestorage.app",
  messagingSenderId: "743107155886",
  appId: "1:743107155886:web:c69551d2cfaf8c91181a3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default app;