import React from "react"
import {AppBar, Drawer,} from "@mui/material"
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined"
import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import Search from "../Search"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDarkMode } from '../../redux/user/darkmodeSlice'
import LightModeIcon from '@mui/icons-material/LightMode';





function Header() {
  const [openDrawer,setOpenDrawer] = useState(false)

  const { currentUser } = useSelector((state) => state.user)
  const [menu, setMenu] = useState(null)

  const dispatch = useDispatch()
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)

  const handleMouseHover = (event) => {
    setMenu(event.currentTarget) 
    console.log("enter")
  };
  const handleMouseLeave = () => {
    setMenu(null)
    console.log("left")
  };


  return (
    <>
      <AppBar  elevation={1} sx={{ backgroundColor: isDarkMode ? 'white': 'black' }}>
      <div className={`flex items-center justify-around font-semibold text-lg ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
      <div className="flex flex-row    text-xl">
      <DevicesOutlinedIcon sx={{ fontSize: 26,color:isDarkMode ? '#374151':'white', '& path': {
      strokeWidth: .01,  //Control Thickness of mui logo
    } }}/>
      <h1 className="">NewKart</h1>

      </div>

       

<Search/>

<ul className={`hidden py-6 md:flex gap-4 text-sm ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
  
  {currentUser && currentUser.isUser ? (
    <NavLink to="/profile" className="flex flex-col items-center gap-1">
      PROFILE
      <hr className={`w-2/4 border-none h-[1.5px] hidden ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`} />
      </NavLink>
  ) :currentUser && currentUser.isSeller ? (
    <NavLink to="/selleraccount" className="flex flex-col items-center gap-1 mr-4">
      SELLER PANEL
      <hr className={`w-2/4 border-none h-[1.5px] hidden ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`} />
    </NavLink>
  ) : (
    <NavLink to="/signin" className="flex flex-col items-center gap-1">
      SIGN IN
      <hr className={`w-2/4 border-none h-[1.5px] hidden ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`} />
    </NavLink>
  )}
   {!currentUser?.isSeller && (
    <NavLink to="/sellerlogin" className="flex flex-col items-center gap-1">
      BECOME A PARTNER
      <hr className={`w-2/4 border-none h-[1.5px] hidden ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`} />
    </NavLink>
  )}
    {currentUser?.isUser && (
            <NavLink
              to={`/cart/${currentUser._id}`}
              className="flex flex-col items-center gap-1"
            >
              <ShoppingCartOutlinedIcon />
              <hr className={`w-2/4 border-none h-[1.5px] hidden ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`} />
              </NavLink>
          )}

{currentUser?.isSeller && (
            <NavLink
              to='/dashboard'
              className="flex flex-col items-center gap-1"
            >
              DASHBOARD
              <hr className={`w-2/4 border-none h-[1.5px] hidden ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`} />

              </NavLink>
          )}

{isDarkMode ? (
        <DarkModeIcon
          onClick={() => {
            dispatch(toggleDarkMode());
            console.log(isDarkMode);
          }}
          sx={{ color: 'gray' }} 
        />
      ) : (
        <LightModeIcon
          onClick={() => {
            dispatch(toggleDarkMode());
            console.log(isDarkMode);
          }}
          sx={{ color: 'white' }} 
        />
      )}

</ul>
<div className=" py-5 cursor-pointer mx-0 md:hidden">
  <MenuRoundedIcon 
  onClick={()=>{setOpenDrawer(true)}}
  sx={{ fontSize: 28,color:isDarkMode ? '#374151': 'white'}}/>



{/*sidebar code*/}
  <Drawer
  open={openDrawer}
   //adjust drawer properties
  PaperProps={{
    sx: {
      width: '100%',
      backgroundColor:isDarkMode ? 'white' : 'black'
    },
  }}
>
  <div className={`flex flex-col ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
    <div className=" flex flex-row justify-between p-3 pr-5 ">
      <div className="flex flex-row    text-xl" onClick={()=>{setOpenDrawer(false)}}>
      <ArrowBackIosRoundedIcon sx={{ fontSize: 28,color: isDarkMode ?'#374151':'white', '& path': {
      strokeWidth: .01,  //Control Thickness of mui logo
    } }}/>
      <p>Back</p>
      </div>
      {isDarkMode ? (
        <DarkModeIcon
          onClick={() => {
            dispatch(toggleDarkMode());
            console.log(isDarkMode);
          }}
          sx={{ color: 'gray' }} 
        />
      ) : (
        <LightModeIcon
          onClick={() => {
            dispatch(toggleDarkMode());
            console.log(isDarkMode);
          }}
          sx={{ color: 'white' }} 
        />
      )}

      </div>
      
  {currentUser ? (
                  <NavLink
                    to="/profile"
                    onClick={() => {
                      setOpenDrawer(false);
                    }}
                    className="py-2 pl-6 border"
                  >
                    PROFILE
                  </NavLink>
                ) : (
                  <NavLink
                    to="/signin"
                    onClick={() => {
                      setOpenDrawer(false);
                    }}
                    className="py-2 pl-6 border"
                  >
                    SIGN IN
                  </NavLink>
                )}
  {currentUser && currentUser.isSeller && (
                  <NavLink
                    to="/selleraccount"
                    onClick={() => { setOpenDrawer(false) }}
                    className='py-2 pl-6 border'
                  >
                    SELLER PANEL
                  </NavLink>
                )}

                {!currentUser?.isSeller && (
                  <NavLink
                    to="/sellerlogin"
                    onClick={() => { setOpenDrawer(false) }}
                    className='py-2 pl-6 border'
                  >
                    BECOME A PARTNER
                  </NavLink>
                )}

  {currentUser && (
  <NavLink to={`/cart/${currentUser._id}`}  onClick={()=>{setOpenDrawer(false)}} className='py-2 pl-6 border'>
    YOUR CART <ShoppingCartOutlinedIcon/>

  </NavLink>
   )}


  
  </div>
</Drawer>

   </div>

      </div>
      </AppBar>
    </>
  );
}

export default Header;


