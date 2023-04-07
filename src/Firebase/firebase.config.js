// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtSgmSMnHPmZlT4CROMtv1-qfeph07HTY",
  authDomain: "tht-customer-management-system.firebaseapp.com",
  projectId: "tht-customer-management-system",
  storageBucket: "tht-customer-management-system.appspot.com",
  messagingSenderId: "1015723855538",
  appId: "1:1015723855538:web:182a55d9b00bb3ede703ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;