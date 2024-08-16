import React, { useState } from 'react'
import { Card,Box, IconButton, Typography,Select ,MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ProductForm from '../Addproductforms/ProductForm';

function Addproducts() {


  const [category,setCategory] = useState('')

    const [selector,setSelector] = useState(false)
  return (
    <>
    <Box className = 'flex flex-row justify-normal m-7  ' >
    <Card  elevation={12} className='p-5 bg-black ' >
        <Box className='flex flex-row justify-center'>
        <Typography   alignContent={'center'}  >Add products </Typography>
        <Box className='bg-green-700  mx-1 rounded-full w-10'>
        <IconButton
        onClick={()=>setSelector(!selector)} className='bg-green-700' ><AddIcon className='text-white bg-green-700  '/></IconButton>
        
        </Box>
        </Box>
        {selector && (
          <>
            <label>Select Category</label>
            <select   className="border border-gray-900 rounded-md mx-2 p-1"  onChange={(e) => setCategory(e.target.value)} value={category}>
            <option   value="">Select</option>

              <option   value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
              <option value="Tablet">Tablet</option>  
              <option value="Television">Television</option> 
              <option value="AudioDevices">AudioDevices</option>  
              <option value="Wearable">Wearable</option>  

 


            </select>
          </>
        )}
<ProductForm category={category}/>
    </Card>
        
    </Box>
    
    </>
  )
}

export default Addproducts