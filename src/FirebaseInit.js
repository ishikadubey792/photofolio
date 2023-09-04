// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaE8QNdgHpJO8XrvfTusM3ywMouvwADcY",
  authDomain: "photofolio-b43ff.firebaseapp.com",
  projectId: "photofolio-b43ff",
  storageBucket: "photofolio-b43ff.appspot.com",
  messagingSenderId: "259226820723",
  appId: "1:259226820723:web:54b39238f705ce85318a06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);