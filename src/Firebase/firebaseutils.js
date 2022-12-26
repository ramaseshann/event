import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore";
import { auth } from "./firebase";




const authorize  = ()=>{ //function to check if user is logged in or not
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
  




export async function getEvents(db){
            
  const eventsof = collection(db,'Events');           
  const EventSnapshot = await getDocs(eventsof);
  const eventList = EventSnapshot.docs.map(doc => doc.data());
 
 
  return eventList;
 }





         
       
      
  
  









export {authorize}