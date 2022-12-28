import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { db } from "../../../Firebase/firebase";
import { getEvents } from "../../../Firebase/firebaseutils";
import { UserContext } from "../../../UserProvider";
import Events from "./Events";
import SectionHeader from "./SectionHeader";

const Homepage = () => {
  const { events, setEvents } = useContext(UserContext);


  return (
    <div>
      <SectionHeader />
      <div className="flex border-2 h-screen  bg-gray-200 justify-center w-full">
        <Events />
      </div>
    </div>
  );
};

export default Homepage;
