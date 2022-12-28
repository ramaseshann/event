import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { authorize } from "../Firebase/firebaseutils";
import useLocalStorage from "../Hooks/localstorage";

export const UserContext = React.createContext({
  user: null,
  setUser: () => null,
  checkAuthentication: () => null,
  events: {list:[],lastkey:null},
  setEvents: () => null,
  state: null,
  setState: () => null,
  change: false,
  setChange: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); //used in header component,
  const [events, setEvents] = useState({list:[],lastkey:null});
  const [state, setState] = useLocalStorage("state", {});
  //  const [localStorage, setLocalStorage] = useLocalStorage("localstorage",{});
  const [change, setChange] = useState(false);
  useEffect(() => {
    // used when the user is logged in or not ,checking from firebase.
    // if true , then set loggedIn to true
    //if false, then set loggedIn to false
    // depending on whether the user is logged in or not,place at Header Component for changing the user status
    checkAuthentication();
    //  async function getdetails() {
    //   const eventsof = collection(db,'Events');
    //   const EventSnapshot = await getDocs(eventsof);
    //   const eventList = EventSnapshot.docs.map(doc => doc.data());

    //  console.log(eventList,"nthai");
    //  setEvents(eventList);

    //  }
    //  getdetails();
  }, []);

  const checkAuthentication = async () => {
    console.log("ji");
    const auth = await authorize();

    if (auth) {
      setUser(auth);
      console.log(auth);
    } else {
      setUser(null);
      console.log("no user");
    }
  };

  console.log(events,"jkooo");
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        checkAuthentication,
        events,
        setEvents,
        state,
        setState,
        change,
        setChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
