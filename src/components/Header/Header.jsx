import React from "react";
import {AppBar,Box,IconButton,Menu,Toolbar,Typography,MenuList,MenuItem, responsiveFontSizes, Drawer,} from "@mui/material";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { Link, NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import ContrastIcon from "@mui/icons-material/Contrast";
import {useSelector} from 'react-redux'
import Search from "../Search";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
function Header() {
  const [openDrawer,setOpenDrawer] = useState(false);

  const { currentUser } = useSelector((state) => state.user)
  const [menu, setMenu] = useState(null);
  const handleMouseHover = (event) => {
    setMenu(event.currentTarget);  
    console.log("enter");
  };
  const handleMouseLeave = () => {
    setMenu(null);
    console.log("left");
  };
  console.log(currentUser.isUser);


  return (
    <>
      <AppBar  elevation={1} sx={{ backgroundColor: "white" }}>
      <div className="flex items-center justify-around font-semibold text-gray-700  text-lg" >
        <div className="flex flex-row    text-xl">
      <DevicesOutlinedIcon sx={{ fontSize: 26,color:'#374151', '& path': {
      strokeWidth: .01,  //Control Thickness of mui logo
    } }}/>
      <h1 className="">NewKart</h1>

      </div>

       

<Search/>

<ul className="hidden py-6 md:flex gap-4 text-sm text-gray-700  ">
  <NavLink    className='flex flex-col cursor-pointer items-center gap-1 '>
  <div className="group relative">
    EXPLORE
<div  className=" group-hover:block hidden absolute dropdown-menu selection:right-0 pt-4">
  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-orange-50 text-gray-500 rounded">
    <p className="cursor-pointer hover:text-black">Laptop</p>
  

    <p className="cursor-pointer hover:text-black">Smartphone</p>
    <p className="cursor-pointer hover:text-black">Audio</p>
    <p className="cursor-pointer hover:text-black">Tablet</p>
    <p className="cursor-pointer hover:text-black">Display</p>
    <p className="cursor-pointer hover:text-black">Smartwatches</p>




  </div>
</div>
    </div>
  </NavLink>
  {currentUser.isUser ? (
    <NavLink to="/profile" className="flex flex-col items-center gap-1">
      PROFILE
      <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
    </NavLink>
  ) : currentUser.isSeller ? (
    <NavLink to="/selleraccount" className="flex flex-col items-center gap-1 mr-4">
      SELLER PANEL
      <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
    </NavLink>
  ) : (
    <NavLink to="/signin" className="flex flex-col items-center gap-1">
      SIGN IN
      <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
    </NavLink>
  )}
   {!currentUser.isSeller && (
    <NavLink to="/sellerlogin" className="flex flex-col items-center gap-1">
      BECOME A PARTNER
      <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
    </NavLink>
  )}
    <NavLink to={`/cart/${currentUser._id}`}  className='flex flex-col items-center gap-1'>
  <ShoppingCartOutlinedIcon/>
  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>


  </NavLink>
  <DarkModeIcon/>

</ul>
<div className=" py-5 cursor-pointer mx-0 md:hidden">
  <MenuRoundedIcon 
  onClick={()=>{setOpenDrawer(true)}}
  sx={{ fontSize: 28,color:'#374151'}}/>



{/*sidebar code*/}
  <Drawer
  open={openDrawer}
   //adjust drawer properties
  PaperProps={{
    sx: {
      width: '100%',
    },
  }}
>
  <div className="flex flex-col  text-gray-700">
    <div className=" flex flex-row justify-between p-3 pr-5 ">
      <div className="flex flex-row    text-xl" onClick={()=>{setOpenDrawer(false)}}>
      <ArrowBackIosRoundedIcon sx={{ fontSize: 28,color:'#374151', '& path': {
      strokeWidth: .01,  //Control Thickness of mui logo
    } }}/>
      <p>Back</p>
      </div>
      <DarkModeIcon fontSize="medium"/>
      </div>
      <NavLink to='/explore' onClick={()=>{setOpenDrawer(false)}}  className='py-2 pl-6 border '>
  <div className="group relative">
    EXPLORE
<div  className=" group-hover:block hidden absolute dropdown-menu selection:right-0 pt-1">
  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-orange-50 text-gray-500 rounded">
    <Link to='/explore'>
    <p className="cursor-pointer hover:text-black">Laptop</p>
    </Link>

    <p className="cursor-pointer hover:text-black">Smartphone</p>
    <p className="cursor-pointer hover:text-black">Audio</p>
    <p className="cursor-pointer hover:text-black">Tablet</p>
    <p className="cursor-pointer hover:text-black">Display</p>
    <p className="cursor-pointer hover:text-black">Smartwatches</p>




  </div>
</div>
    </div>
  </NavLink>
  <NavLink to='/signin'onClick={()=>{setOpenDrawer(false)}} className='py-2 pl-6 border'>
    SIGN IN 

  </NavLink>
  <NavLink to='/sellerlogin' onClick={()=>{setOpenDrawer(false)}} className='py-2 pl-6 border'>
    BECOME A PARTNER

  </NavLink>
  <NavLink to='/sellerlogin' className='py-2 pl-6 border'>
    YOUR CART <ShoppingCartOutlinedIcon/>

  </NavLink>
  


  
  </div>
</Drawer>

   </div>

      </div>
      </AppBar>
    </>
  );
}

export default Header;


