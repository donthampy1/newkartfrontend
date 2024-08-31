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
<div>
<button className=' w-full bg-black mt-20 cursor-pointer text-white p-2  hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none' onClick={handleSignout} > Signout</button>
    
</div>
    
    
      <button className="text-white bg-black mt-6   border-2  
      hover:bg-gray-700 hover:text-white hover:scale-110 transition-transform duration-1000">
          <Link to="addproducts">
              <Typography>
                  Add products  <AccountCircleIcon />
              </Typography>
          </Link>
      </button>
      <Outlet />
      </>)
}

export default SellerAccount