import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect } from 'react'
import { db } from '../../../Firebase/firebase';import { getEvents } from '../../../Firebase/firebaseutils';
import { UserContext } from '../../../UserProvider';
import Events from './Events';
import SectionHeader from './SectionHeader';



const Homepage = () => {
 const {events, setEvents} = useContext(UserContext);
  useEffect(() => {
 
    
  
   
    async function getEvents(db){
            
        const eventsof = collection(db,'Events');           
        const EventSnapshot = await getDocs(eventsof);
        const eventList = EventSnapshot.docs.map(doc => doc.data());
       
       console.log(eventList,"nthai");
       setEvents(eventList);
        return eventList;
       }
       const even = getEvents(db);
      
    
  }, []);

 


  return (
   
    <div>
      <SectionHeader/>
      <div className='flex border-2 h-screen  bg-gray-200 justify-center w-full'>
      <Events />
      </div>
   
    </div>
  )
}

export default Homepage
