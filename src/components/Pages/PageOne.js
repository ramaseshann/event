import React from 'react'
import SignIn from '../Home/SignIn'
import Info from '../Home/Info'
import SignUp from '../Home/SignUp'
import {Routes, Route, NavLink} from 'react-router-dom'
const PageOne = () => {
  return (
    <div className='flex'>
        <div className='w-1/2'>
        <SignIn/>
        <Routes>
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
        </div>
       

   
    <Info/>
  
     
    </div>
  )
}

export default PageOne
