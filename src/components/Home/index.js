import React from 'react'
import Header from '../Layout/Header'
import SignIn from './SignIn'

import {Routes, Route} from 'react-router-dom'
import MyEvent from './MyEvent'
import Homepage from '../Pages/Homepages'
import Jango from '../Jango'
import SignUp from './SignUp'
import AddEvent from './AddEvent'
import EditEvent from './EditEvent'



const Home = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>

        <Route path="/signup" element={<Jango><SignUp/></Jango>} />
        <Route path="/signin" element={<Jango><SignIn/></Jango>} />
        <Route path="/addevent" element={<Jango><AddEvent/></Jango>}/>
        <Route path="/myevents" element={<Jango><MyEvent/></Jango>}/>
        <Route path="/myevents/edit" element={<Jango><EditEvent/></Jango>}/>
      </Routes>
    
    
    </div>
  )
}

export default Home
