import classnames from 'classnames'
import React, { useContext } from 'react'
import { UserContext } from '../UserProvider'


import Info from './Home/Info'
const Jango = ({children}) => {
  const {user} = useContext(UserContext)
  return (
    <div className={classnames("flex",{"flex-row-reverse":user})}>
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
