import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase";
import { UserContext } from "../../UserProvider";
//import variables from usercontext (loggegIn) for user status
const Header = () => {
  const { checkAuthentication, user } = useContext(UserContext);
  let navigate = useNavigate();

  function onClick() {
    signOut(auth)
      .then(() => {
        checkAuthentication();
        console.log("Logged out");
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/");
  }

  return (
    <header className="shadow-lg h-24 flex w-full justify-center items-center">
      <div className="container  flex items-center justify-between px-[100px] ">
        <NavLink to="/">
          <section className="left_header w-80">
            {/* Event logo with image */}Home
          </section>
        </NavLink>

        <section className="right_header flex gap-10  justify-between items-center">
          {user && (
            <div className="flex items-center justify-between cursor-pointer">
              <NavLink to="/addevents">Add events</NavLink>
            </div>
          )}
          {user && (
            <div className="flex items-center justify-between cursor-pointer">
              <NavLink to="myevents">My events</NavLink>
            </div>
          )}
          {user === null && (
            <div className="flex items-center justify-between cursor-pointer">
              <NavLink to="signin">Sign In</NavLink>
              {/* SIgn */}
            </div>
          )}

          <div
            className="flex items-center justify-center cursor-pointer rounded-full h-10 text-red-800 "
            onClick={onClick}
          >
            {user === null ? "" : "Sign Out"}
          </div>
          <div></div>
        </section>
      </div>
    </header>
  );
};

export default Header;
