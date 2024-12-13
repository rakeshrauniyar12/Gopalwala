// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyBu81EoGbPyJUiRSGlTLWYJcAGr6K8MSF8",
  authDomain: "gowpala-a665a.firebaseapp.com",
  projectId: "gowpala-a665a",
  storageBucket: "gowpala-a665a.appspot.com",
  messagingSenderId: "743107155886",
  appId: "1:743107155886:web:c69551d2cfaf8c91181a3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default app;
