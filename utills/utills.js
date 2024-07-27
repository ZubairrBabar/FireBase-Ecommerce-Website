import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut   } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc ,getDocs,updateDoc, arrayUnion, arrayRemove,  query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, uploadBytes,  getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDstu6KQ7ORwGQaoPH2z85Y0DRjj97h5hM",
  authDomain: "my-first-project-a894d.firebaseapp.com",
  projectId: "my-first-project-a894d",
  storageBucket: "my-first-project-a894d.appspot.com",
  messagingSenderId: "129049233309",
  appId: "1:129049233309:web:c3ee36913289be3abc9174",
  measurementId: "G-XF5KPJGGKL"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export{ auth, db, storage, onAuthStateChanged, createUserWithEmailAndPassword, doc, setDoc, ref, uploadBytes,  getDownloadURL, signInWithEmailAndPassword, signOut, getDoc, collection, addDoc, getDocs,updateDoc, arrayUnion, arrayRemove,  query, where, deleteDoc }