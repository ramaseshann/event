import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
//import variables from usercontext (loggegIn) for user status
const Header = () => {

 

  return (
    <header className='shadow-lg h-24 flex w-full justify-center items-center'>
    <div className='container  flex items-center justify-between px-[100px] border-2'>
        <section className='left_header w-80'>
            {/* Event logo with image */}hi
        </section>
        <section className='right_header flex gap-10  justify-between items-center' >
            <div className='flex items-center justify-between cursor-pointer'>
                <NavLink to='myevents'>
                My events
                </NavLink>
            </div>
            <div className='flex items-center justify-between cursor-pointer'>
                <NavLink to="signin">
                Sign In 
                </NavLink>
                {/* SIgn */}
            
            </div>
           
            <div className='flex items-center justify-center cursor-pointer rounded-full w-10 h-10 bg-black '>  
                hi
            </div> 
            <div>

            </div>
        </section>
        
    </div>
   



</header>
  )
}

export default Header

