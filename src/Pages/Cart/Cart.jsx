import React from "react";
import { Card, CardContent, Typography, Box, TextField } from "@mui/material";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { useForm } from "react-hook-form"
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { signInStart,signInFailure,signInSuccess } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuthLogin from "../../components/Header/GoogleAuthLogin";


function Cart() {
    const {register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.user)

    const onSubmit = async (data)=>{
      try {
        dispatch(signInStart())

        console.log(data)
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3000/auth/signin',    
          data,
          withCredentials: true
      })
      
        dispatch(signInSuccess(response.data))
        console.log(response.data)
        navigate('/')
      }catch(err){

        if (err.response && err.response.status === 404 ) {
          setError("email", { type: "manual", message: err.response.data.message });
        } else {  
            console.log('An unexpected error occurred:', err);
        }
        dispatch(signInFailure(err))

    }

    }





  return (
    <Box className="flex  flex-col items-center justify-center pt-20  ">
      <Card elevation={12} className="p-6  w-80 flex flex-col  pb-11  ">
        <Box className="flex flex-row items-center justify-center text-green-700 p-1 w-full text-center">
          <DevicesOutlinedIcon fontSize="large" />
          <Typography variant="h5" component="div">
            DONKART this is caart
            
          </Typography>
        </Box>

        <h1 className="text-2xl  font-semibold py-2">Sign In</h1>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-md py-0">email</h1>

            <input
              {...register('email',{
                required:"email is required"
              }
              )}
              type="email"
              placeholder="your name"
              className="px-3 py-1 border-2 border-black rounded-md w-full"
            ></input>
            

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
              placeholder="your name"
              className="px-3 py-1 border-2 border-black rounded-md w-full"
            ></input>
            {errors.email && (
                <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
            <button 
            disabled={isSubmitting}
            className=" w-full bg-green-700 rounded-md text-white p-2 mt-4 hover:bg-green-800 hover:text-white focus:bg-green-700 focus:text-white focus:outline-none">{isSubmitting ? "Logging in ..." :"SIGN IN"}</button>



<GoogleAuthLogin setError={setError}/>











          </form>
         <h1 className="text-center text-2xl">or</h1>
         <button  
         className="text-green-700 p-2 mt-2 bg-white w-full rounded-md px-1 border-2 border-green-700 hover:bg-green-700 hover:text-white  transition-transform duration-1000 ">
              <Link to='/signup'>
              <Typography> Sign Up</Typography>
              </Link>
            </button>

        </Box>
      </Card>
    </Box>
  );
}

export default Cart;
