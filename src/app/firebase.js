// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6XdbLEVmQhRWql-7ShLOSa09IIoTVwi0",
  authDomain: "heybuddy-11e32.firebaseapp.com",
  projectId: "heybuddy-11e32",
  storageBucket: "heybuddy-11e32.appspot.com",
  messagingSenderId: "108081798591",
  appId: "1:108081798591:web:89bbb5a046b8651137d50a",
  measurementId: "G-9M641WXEVE"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// const auth = getAuth(app);
const db = firebaseApp.firestore();
export {auth,db};