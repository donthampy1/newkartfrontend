import React from 'react'
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";


const Footer = () => {
  return (
    <>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-9 my-10 mt-48 text-sm'>
<div className=''>
<div className="flex flex-row mb-3 w-32  font-semibold">
      <DevicesOutlinedIcon sx={{ fontSize: 26,color:'#374151', '& path': {
      strokeWidth: .01,  //Control Thickness of mui logo
    } }}/>
      <h1 className="text-xl text-gray-700">NewKart</h1>
      </div>   
      <p className='w-full md:w-2/3 text-gray-700'>At NewKart, we are committed to delivering innovation and excellence, making your shopping experience seamless and satisfying. Stay connected for exciting deals and offers !!</p>
</div>
        
        <div className=''>
            <p className='text-xl font-medium mb-3'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-700'>
                <li>Home</li>
                <li> About us</li>
                <li> Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-3'>  GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-700'>
                <li>9837927481</li>
                <li>newkartcustomerservice@gmail.com</li>
            </ul>
        </div>
           
            
            </div>
            <div className=''>
                <hr/>
                <p className='py-5 text-sm text-gray-700 text-center '>Copyright@NewKart</p>
            </div>
            </>
  )
}

export default Footer