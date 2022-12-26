import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBmNZGUXDOV4Ri2QqngXL43F-Vn8A4aTyg",
  authDomain: "event-103cf.firebaseapp.com",
  projectId: "event-103cf",
  storageBucket: "event-103cf.appspot.com",
  messagingSenderId: "774360338069",
  appId: "1:774360338069:web:1f0043d77aee9b6177159c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);


export { auth, db,storage};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};



