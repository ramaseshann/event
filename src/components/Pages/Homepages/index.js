import React, { useContext } from "react";
import { UserContext } from "../../../UserProvider";
import Events from "./Events";
import SectionHeader from "./SectionHeader";

const Homepage = () => {
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
