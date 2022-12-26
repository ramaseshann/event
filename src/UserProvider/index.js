import React, { useState, useEffect } from "react";
import { authorize } from "../Firebase/firebaseutils";

export const UserContext = React.createContext({
  user: null,
  setUser: () => null,
  checkAuthentication:()=>null,
  events: [],
  setEvents: ()=>null,
  state: null,
  setState: ()=>null
  
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); //used in header component,
 const[events, setEvents] = useState([]);
 const [state, setState] = useState({});
  useEffect(() => {
    // used when the user is logged in or not ,checking from firebase.
    // if true , then set loggedIn to true
    //if false, then set loggedIn to false
    // depending on whether the user is logged in or not,place at Header Component for changing the user status
    checkAuthentication();
    
    
  }, []);


  
   const checkAuthentication = async() => {
    console.log("ji");  
    const auth= await authorize();
  
    if (auth) {
      setUser(auth);
      console.log(auth);
      
    } else {
      setUser(null);
      
    }
    

  }





  

  

  return (
    <UserContext.Provider value={{ user, 
                                    setUser , 
                                    checkAuthentication,
                                    events,
                                    setEvents,
                                    state,
                                    setState}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
