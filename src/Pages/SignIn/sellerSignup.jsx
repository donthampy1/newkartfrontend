import React from "react";
import { Card, Typography, Box } from "@mui/material";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { useForm } from "react-hook-form"
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";


function SellerSignup() {


    const {register,handleSubmit,formState:{ errors,isSubmitting},setError } = useForm()
    const navigate = useNavigate()



    const onSubmit = async (data)=>{
      try {
        console.log(data)

        const response = await axios.post('http://localhost:3000/auth/sellersignup', data)
        console.log(data)
        console.log("this is reply from server",response.data)
        navigate('/')
      }catch(err){
        if (err.response && err.response.status === 400) {
            setError("email", { type: "manual", message: err.response.data.message });
        } else {  
            console.log('An unexpected error occurred:', err);
        }
    }

    }




  return (
    <Box className="flex  flex-col items-center justify-center min-h-screen  ">
    <Card elevation={12} className="p-6  w-80 flex flex-col  pb-11  ">
      <Box className="flex flex-row items-center justify-center text-green-700 p-1  text-center">
        <DevicesOutlinedIcon fontSize="large" />
        <Typography variant="h5" component="div">
          DONKART
        </Typography>
      </Box>

      <h1 className="text-2xl py-2">Register</h1>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-md py-0">Agency name</h1>

<input
  {...register('agencyname',{
    required:"agencyname is required"
  }
  )}
  type="text"
  placeholder="Agency name"
  className="px-3 py-1 border-2 border-black rounded-md w-full"
></input>
{errors.agencyname && (
    <div className="text-red-500 text-sm">{errors.agencyname.message}</div>
)}
          <h1 className="text-md py-0"> Agency email</h1>

          <input
            {...register('email',{
              required:"email is required"
            }
            )}
            type="email"
            placeholder="your email"
            className="px-3 py-1 border-2 border-black rounded-md w-full"
          ></input>
          {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
      )}
       <h1 className="text-md py-0">Agency phone</h1>

<input
  {...register('phone',{
    required:"phone is required"
  }
  )}
  type="number"
  placeholder="your phone number"
  className="px-3 py-1 border-2 border-black rounded-md w-40"
></input>
{errors.phone && (
    <div className="text-red-500 text-sm">{errors.phone.message}</div>
)}

          <h1 className="text-md pt-1">password</h1>

          <input
          {...register('password',{
              required:"password is required",
              minLength:{
                  value: 6 ,
                  message:" minimum 6 characters required"
              }
          })}

            type="password"
            placeholder="your password"
            className="px-3 py-1 border-2 border-black rounded-md w-40"
          ></input>
          {errors.password && (
              <div className="text-red-500 text-sm">{errors.password.message}</div>
      )}
          <button 
          type="submit"
          disabled={isSubmitting}
          className=" w-full bg-green-700 rounded-md text-white p-2 mt-4 hover:bg-green-800 hover:text-white focus:bg-green-700 focus:text-white focus:outline-none">{isSubmitting ? "Signing up ..." :"Signup"}</button>


          {errors.email ? (
              <div className="text-red-500 text-sm">credential's are already in use</div>
      ):<div/>}
          

        </form>
       <h1 className="text-center text-2xl">or</h1>
       <button  
       className="text-green-700 p-2 mt-2 bg-white w-full rounded-md px-1 border-2 border-green-700 hover:bg-green-700 hover:text-white  transition-transform duration-1000 ">
            <Link to='/sellersignin'>
            <Typography> registered partner ? Login</Typography>
            </Link>
          </button>

      </Box>
    </Card>
  </Box>
  )
}

export default SellerSignup