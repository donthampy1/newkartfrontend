import React from 'react'
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { useSelector } from 'react-redux'


const Footer = () => {
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)

  return (
    <>
<div className={`flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-9 my-10 mt-48 text-sm ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
<div className=''>
<div className="flex flex-row mb-3 w-32  font-semibold">
      <DevicesOutlinedIcon sx={{ fontSize: 26,color: isDarkMode ? '#374151' : 'white', '& path': {
      strokeWidth: .01,  //Control Thickness of mui logo
    } }}/>
  <h1 className={`text-xl ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>NewKart</h1>
  </div>   
      <p className='w-full md:w-2/3 '>At NewKart, we are committed to delivering innovation and excellence, making your shopping experience seamless and satisfying. Stay connected for exciting deals and offers !!</p>
</div>
        
        <div className=''>
            <p className='text-xl font-medium mb-3'>COMPANY</p>
            <ul className='flex flex-col gap-1 '>
                <li>Home</li>
                <li> About us</li>
                <li> Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-3'>  GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 '>
                <li>9837927481</li>
                <li>newkartcustomerservice@gmail.com</li>
            </ul>
        </div>
           
            
            </div>
            <div className={`p-4 ${isDarkMode ? 'text-gray- ' : ' text-white'}`}>
            <hr/>
                <p className='py-5 text-sm  text-center '>Copyright@NewKart</p>
            </div>
            </>
  )
}

export default Footer