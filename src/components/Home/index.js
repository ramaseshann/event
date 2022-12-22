import React from 'react'
import Header from '../Layout/Header'
import SignIn from './SignIn'
import Info from './Info'
import {Routes, Route} from 'react-router-dom'
import PageOne from '../Pages/PageOne'
import Homepage from '../Pages/Homepage'
import Jango from '../Jango'
import SignUp from './SignUp'



const Home = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>

        <Route path="/signup" element={<Jango><SignUp/></Jango>} />
        <Route path="/signin" element={<Jango><SignIn/></Jango>} />
      </Routes>
    
    
    </div>
  )
}

export default Home
