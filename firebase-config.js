// firebase-config.js (Loaded via module on frontend)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, setDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDWWTKONpQbfFIYUUcG9AsJy1Xg6X_GCds",
    authDomain: "goforevents-14ebc.firebaseapp.com",
    projectId: "goforevents-14ebc",
    storageBucket: "goforevents-14ebc.firebasestorage.app",
    messagingSenderId: "880107845345",
    appId: "1:880107845345:web:4f5cacff6227b0f3f729a0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage, collection, addDoc, getDoc, getDocs, doc, setDoc, deleteDoc, onSnapshot, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, ref, uploadString, getDownloadURL, deleteObject };
