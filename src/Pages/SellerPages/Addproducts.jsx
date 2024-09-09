import React, { useState } from 'react'
import { Card,Box, IconButton, Typography,Select ,MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ProductForm from '../Addproductforms/ProductForm';

function Addproducts() {


  const [category,setCategory] = useState('')

  return (
    <>
    <Box className = 'flex flex-row justify-center m-7  ' >
    <Card  elevation={0} className='p-5 items-center bg-black   border border-slate-700 ' >
        
       
          <>
            <label>Select Category</label>
            <select   className="border border-gray-900  mx-2 p-1"  onChange={(e) => setCategory(e.target.value)} value={category}>
              <option> category</option>

              <option   value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
              <option value="Tablet">Tablet</option>  
              <option value="Television">Television</option> 
            

 


            </select>
          </>
       
<ProductForm category={category}/>
    </Card>
        
    </Box>
    
    </>
  )
}

export default Addproducts