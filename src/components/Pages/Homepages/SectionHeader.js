import { Button } from 'antd'
import React, { useState } from 'react'
import Typical from 'react-typical'

const SectionHeader = () => {
    const[label, setLabel] = useState("Explore");
  return (
 
      <section className='h-[550px] flex flex-col gap-10 justify-center mt-10  ' >
    <div className='flex flex-col'>
        <div className='text-[56px] text-bold items-center flex justify-center   '>
         Discover &nbsp;
            <Typical
                loop={Infinity}
                
                wrapper="b"
                steps={[
                    'Events',4000,'200M+ Events',6000,
                ]}/>
                
        </div>
        <p className='flex justify-center text-[36px] text-bold'>
        Happening in your city
        </p>
    </div>
    <p className="flex  justify-center text-gray-600">
    20M People Exploring Events every month
    </p>
   <div className='flex justify-center'>
    
   <Button  

        type="primary" 
        className='bg-[#5ecdaa] text-white  w-32 h-10 '   
        >
            {label}
        </Button>
   </div>


            
      
       
    </section>

  )
}

export default SectionHeader
