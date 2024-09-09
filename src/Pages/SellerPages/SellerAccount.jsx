import React from 'react'
import { Link } from "react-router-dom";
import { Typography ,Card} from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { signOut } from "../../redux/user/userSlice";




function SellerAccount() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSignout = async ()=>{
        try {
            dispatch(signOut())
            await fetch ('https://newkartbackend-1.onrender.com/auth/signout')
            console.log('working')
            navigate('/')

        }catch(error){
            console.log(error)

        }
    }











  return (
      <>
<div className='mt-20'>

    
</div>
    
    
      <button className=" w-full bg-black mt-20 cursor-pointer text-white p-2  hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none">
          <Link to="addproducts">
              <Typography>
                  Add products  
              </Typography>
          </Link>
      </button>
      <Outlet />
      <div>

    
</div>
<div>
<button className=' w-full bg-black mt-20 cursor-pointer text-white p-2  hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none' onClick={()=>navigate('/selleraccount/editproducts')} > Edit Products</button>



<button className=' w-full bg-black mt-20 cursor-pointer text-white p-2  hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none' onClick={()=>navigate('/selleraccount/sellerorders')} >Orders</button>


<button className=' w-full bg-black mt-20 cursor-pointer text-white p-2  hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none' onClick={handleSignout} > Signout</button>







</div>

      </>)
}

export default SellerAccount