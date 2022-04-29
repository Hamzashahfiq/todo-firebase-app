import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDK3bFv2I_-k9X_4OC7c0GpKs2O_wksHdE",
    authDomain: "react-todo-app-57b5d.firebaseapp.com",
    projectId: "react-todo-app-57b5d",
    storageBucket: "react-todo-app-57b5d.appspot.com",
    messagingSenderId: "811095701937",
    appId: "1:811095701937:web:c1c780b8936841f9cde590",
    measurementId: "G-M63WSD7BRP"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();
export const auth = firebase.auth();