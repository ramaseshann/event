import React from 'react'
import Header from '../Layout/Header'
import SignIn from './SignIn'

import {Routes, Route, useParams} from 'react-router-dom'
import MyEvent from './MyEvent'
import Homepage from '../Pages/Homepages'
import Jango from '../Jango'
import SignUp from './SignUp'
import AddEvent from './AddEvent'
import EditEvent from './EditEvent'
import User from './User'
import UserDetails from './User/UserDetails'




const Home = () => {

 
  
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>

        <Route path="/signup" element={<Jango><SignUp/></Jango>} />
        <Route path="/signin" element={<Jango><SignIn/></Jango>} />
        <Route path="/add_events" element={<Jango><AddEvent label="Add Event"/></Jango>}/>
        <Route path="/my_events" element={<MyEvent/>}/>
        <Route exact path='/my_events/edit/:id' element={<EditEvent/>}/>
       
      </Routes>
    
    
    </div>
  )
}

export default Home
