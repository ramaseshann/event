

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from '../UserProvider'
import Home from './Home'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <UserProvider>
      <Home/>
      </UserProvider>
  
      </BrowserRouter>
    </div>  
  )
}

export default App

