import React from "react";
import { Card, CardContent, Typography, Box, TextField } from "@mui/material";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function SellerLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      email: "donseller2@gmail.com",
      password: "donseller2",
    },
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const onSubmit = async (data) => {
    try {
      dispatch(signInStart());

      console.log(data);
      const response = await axios({
        method: "post",
        url: "https://newkartbackend-1.onrender.com/auth/sellersignin",
        data,
        withCredentials: true,
      });

      dispatch(signInSuccess(response.data));
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("email", {
          type: "manual",
          message: err.response.data.message,
        });
      } else {
        console.log("An unexpected error occurred:", err);
      }
      dispatch(signInFailure(err));
    }
  };

  return (
    <Box className="flex  flex-col   items-center justify-center pt-28   ">
      <div className="p-6  border-gray-400 border shadow-lg  w-80 flex flex-col items-center  pb-11   ">
        <h1
          className={`text-3xl py-5 ${
            isDarkMode ? "text-gray-700" : "text-white"
          }`}
        >
          Sign In
        </h1>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email", {
                required: "email is required",
              })}
              type="email"
              placeholder="your name"
              className="px-3 py-2 border border-gray-700 w-full"
            ></input>

            <input
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: " minimum 6 characters required",
                },
              })}
              type="password"
              placeholder="your name"
              className="px-3 py-2 border-2 mt-5 border-gray-700 w-full"
            ></input>
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
            <button
              disabled={isSubmitting}
              className="w-full bg-black text-white p-2 mt-4 hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none"
            >
              {isSubmitting ? "Logging in ..." : "SIGN IN"}
            </button>
          </form>
          <button className=" mt-2 hover:text-blue-900 ">
            <Link to="/sellersignup">
              <p className={` ${isDarkMode ? "text-gray-700" : "text-white"}`}>
                Not a registered seller ? Sign Up
              </p>
            </Link>
          </button>
        </Box>
      </div>
    </Box>
  );
}

export default SellerLogin;
