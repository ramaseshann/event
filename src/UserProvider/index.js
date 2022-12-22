import React, { useState, useEffect } from "react";
import { authorize } from "../Firebase/firebaseutils";

export const UserContext = React.createContext({
  user: null,
  setUser: () => null,
  checkAuthentication:()=>null
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); //used in header component,

  useEffect(() => {
    // used when the user is logged in or not ,checking from firebase.
    // if true , then set loggedIn to true
    //if false, then set loggedIn to false
    // depending on whether the user is logged in or not,place at Header Component for changing the user status
    checkAuthentication();
    
  }, []);


  
  const checkAuthentication = () => {
    const auth = authorize();
    if (auth) {
      setUser(auth);
      console.log(user);
    } else {
      setUser(null);
    }
    
  }
  
  

  

  return (
    <UserContext.Provider value={{ user, setUser , checkAuthentication}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
