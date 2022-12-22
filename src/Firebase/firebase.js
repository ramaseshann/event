import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmNZGUXDOV4Ri2QqngXL43F-Vn8A4aTyg",
  authDomain: "event-103cf.firebaseapp.com",
  projectId: "event-103cf",
  storageBucket: "event-103cf.appspot.com",
  messagingSenderId: "774360338069",
  appId: "1:774360338069:web:1f0043d77aee9b6177159c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();



export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};



 export {auth}