import React from 'react'
import Hero from '../../components/Hero'
import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    const fetch = async (retries = 5, delay = 2000) => {

      try {
        const response = await axios.get(`https://newkartbackend-1.onrender.com/initialize`)
        console.log(response)

        if (response && response.status === 200) {
          console.log('Initialization successful');
          return
        }

      }catch(error){
        console.log(error)

        if (retries > 0) {
          setTimeout(() => {
            fetch(retries - 1, delay);
          }, delay);
        } else {
          console.log('Failed to initialize after maximum retries');
        }
        
      }   
  }
  fetch()
},[])





  return (
    <div className='mt-16  p-1' >
      <Hero/>
    </div>
  )
}

export default Home


