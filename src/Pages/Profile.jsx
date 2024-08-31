import React from 'react'
import { signOut } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';



const Profile = () => {

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
    <div className='mt-20 '>


        <button className=' w-full bg-black text-white p-2 mt-4 hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none' onClick={handleSignout}> Signout</button>
    </div>
  )
}

export default Profile