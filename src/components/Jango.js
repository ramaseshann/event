import React from 'react'

import Info from './Home/Info'
const Jango = ({children}) => {
  return (
    <div className='flex '>
        <div className='w-1/2'>
        {children}
        </div>
        <div className='w-1/2'>
        <Info/>
        </div>
    </div>
  )
}

export default Jango
