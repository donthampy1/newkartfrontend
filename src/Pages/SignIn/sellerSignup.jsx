import React from "react";
import {  Box } from "@mui/material";
import { useForm } from "react-hook-form"
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"
import { useSelector } from 'react-redux'



function SellerSignup() {


    const {register,handleSubmit,formState:{ errors,isSubmitting},setError } = useForm()
    const navigate = useNavigate()
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)




    const onSubmit = async (data)=>{
      try {
        console.log(data)

        const response = await axios.post('https://newkartbackend-1.onrender.com/auth/sellersignup', data)
        console.log(data)
        console.log("this is reply from server",response.data)
        navigate('/sellerlogin')
      }catch(err){
        if (err.response && err.response.status === 400) {
            setError("email", { type: "manual", message: err.response.data.message });
        } else {  
            console.log('An unexpected error occurred:', err);
        }
    }

    }




  return (
    <Box className="flex  flex-col   items-center justify-center pt-24  ">
    <div className="p-6   border-gray-400 border shadow-lg  w-80 flex flex-col items-center  pb-11  ">
     

    <h1 className={`text-3xl py-5 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Register</h1>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>

<input
  {...register('agencyname',{
    required:"agencyname is required"
  }
  )}
  type="text"
  placeholder="Agency name"
  className="px-3 py-2 border border-gray-700 w-full"
></input>
{errors.agencyname && (
    <div className="text-red-500 text-sm">{errors.agencyname.message}</div>
)}

          <input
            {...register('email',{
              required:"email is required"
            }
            )}
            type="email"
            placeholder="email"
            className="px-3 py-2 mt-5 border border-gray-700 w-full"
          ></input>
          {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
      )}

<input
  {...register('phone',{
    required:"phone is required"
  }
  )}
  type="number"
  placeholder="your phone number"
  className="px-3 py-2 mt-5 border border-gray-700 w-full"
></input>
{errors.phone && (
    <div className="text-red-500 text-sm">{errors.phone.message}</div>
)}


          <input
          {...register('password',{
              required:"password is required",
              minLength:{
                  value: 6 ,
                  message:" minimum 6 characters required"
              }
          })}

            type="password"
            placeholder="password"
            className="px-3 mt-5 py-2 border border-gray-700 w-full"
          ></input>
          {errors.password && (
              <div className="text-red-500 text-sm">{errors.password.message}</div>
      )}
          <button 
          type="submit"
          disabled={isSubmitting}
          className=" w-full bg-black text-white p-2 mt-4 hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none">{isSubmitting ? "Signing up ..." :"Signup"}</button>


          {errors.email ? (
              <div className="text-red-500 text-sm">credential's are already in use</div>
      ):<div/>}
          

        </form>
       <button  
       className="mt-2 hover:text-blue-900 ">
            <Link to='/sellerlogin'>
            <p   className={` ${isDarkMode ? 'text-gray-700' : 'text-white'}`}> registered partner ? </p>
            </Link>
          </button>

      </Box>
    </div>
  </Box>
  )
}

export default SellerSignup