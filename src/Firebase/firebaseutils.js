import { getAuth, onAuthStateChanged } from "firebase/auth"




const authorize  = ()=>{ //function to check if user is logged in or not
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
   
  
   return user
 
    
    }
   
   else {
    // User is signed out
    return null
}})

}








         
       
      
  
  









export {authorize}