// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCm4TBTj1-c32xv30QIIuUUEctkMM9E2-8",
    authDomain: "react-cursos-4807d.firebaseapp.com",
    projectId: "react-cursos-4807d",
    storageBucket: "react-cursos-4807d.firebasestorage.app",
    messagingSenderId: "81033680327",
    appId: "1:81033680327:web:46120399703122c9abb5e2"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );