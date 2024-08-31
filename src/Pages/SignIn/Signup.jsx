import React from "react";
import { Card, Typography, Box } from "@mui/material";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { useForm } from "react-hook-form"
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleAuth from "../../components/Header/GoogleAuth";


function Signup() {


    const {register,handleSubmit,formState:{ errors,isSubmitting},setError } = useForm()
    const navigate = useNavigate()



    const onSubmit = async (data)=>{
      try {
        const response = await axios.post('https://newkartbackend-1.onrender.com/auth/signup', data)
        console.log(data)
        console.log("this is reply from server",response.data)
        navigate('/signin')
      }catch(err){
        if (err.response && err.response.status === 400) {
            setError("email", { type: "manual", message: err.response.data.message });
        } else {  
            console.log('An unexpected error occurred:', err);
        }
    }

    }




  return (
    <Box className="flex  flex-col items-center justify-center pt-24  ">
    <div className="p-6  border-gray-400 border shadow-lg  w-80 flex flex-col items-center  pb-11   ">
      

      <h1 className="text-2xl py-2">Sign Up</h1>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>

<input
  {...register('username',{
    required:"username is required"
  }
  )}
  type="text"
  placeholder="name"
  className="px-3 py-2 border border-gray-700  w-full"
></input>
{errors.name && (
    <div className="text-red-500 text-sm">{errors.name.message}</div>
)}

          <input
            {...register('email',{
              required:"email is required"
            }
            )}
            type="email"
            placeholder="email"
            className="px-3 py-2 mt-4 border border-gray-700 w-full"
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
  placeholder="number"
  className="px-3 py-2 mt-4 border border-gray-700 w-full"
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
            className="px-3 py-2 mt-4 border border-gray-700 w-full"
          ></input>
          {errors.password && (
              <div className="text-red-500 text-sm">{errors.password.message}</div>
      )}
          <button 
          type="submit"
          disabled={isSubmitting}
          className=" w-full bg-black text-white p-2 mt-4 hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none">{isSubmitting ? "Signing up ..." :"Signup"}</button>


          <GoogleAuth setError={setError}/>
          {errors.password && (
              <div className="text-red-500 text-sm">{errors.password.message}</div>
      )}
          

        </form>
       <button  
       className=" mt-2 hover:text-blue-900 ">
            <Link to='/signin'>
            <p className=""> Already have an account ?</p>
            </Link>
          </button>

      </Box>
    </div>
  </Box>
  )
}

export default Signup