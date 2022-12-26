import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../UserProvider';

const Events = () => {
   

    const { events, setEvents } = useContext(UserContext);
   
     useEffect(() => {
         events.map((event) => {
            console.log(event);
         })
            
        })
        
     
   
    
    
  return (
    <div className='flex  flex-col container items-center mt-20  border-2 pb-20 shadow-sm shadow-[#f8fafc]'>
        <h2 className='flex text-[46px] fonr-poppins font-bold m-10'>Popular Events in Kochi</h2>
        <div className='flex'>
   
    <div className='grid grid-cols-3 gap-y-20 gap-x-20  w-auto   '>
     {events.map((event) => (
 
            <article className="flex flex-col w-96 h-96 cursor-pointer rounded-[20px] shadow-lg  border-[0.2px " >
                    <section className='w-full h-60 bg-white  '>
                     
                        {/* <img src={eve.event_poster} alt="" className="object-cover h-full border-2 w-96"/>
                         */}
                    </section>
                    <section className='flex justify-center border-t-[0.2px]  flex-1 items-center  gap-10   bg-white'>
                        <div className='flex '>
                            <h3 className='flex flex-col text-red-600 text-[13px]'>
                                DEC
                                <span className='text-black'>
                                 16
                                </span>
                            </h3>   
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='flex '>
                            Brahma - Kochi
                            </h3>
                            <section className='flex flex-col'>
                                <h4 className='flex '>
                                   Kerala
                                </h4> 
                                <p className='flex'>
                                Wed Dec 15 2022 at 09:00 pm
                                </p>
                            </section>
                        </div> 
                    </section>
                    
                </article>
     ))}
                </div>
                         
    </div>
    </div>
  )
}

export default Events
