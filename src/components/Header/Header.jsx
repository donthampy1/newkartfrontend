import React from "react";
import {AppBar,Box,IconButton,Menu,Toolbar,Typography,MenuList,MenuItem,} from "@mui/material";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import ContrastIcon from "@mui/icons-material/Contrast";
import {useSelector} from 'react-redux'
import Search from "../Search";

function Header() {
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

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            className="text-green-700"
          >
            <DevicesOutlinedIcon fontSize="large" />
            <Typography variant="h5" component={"div"}>
              DONKART
            </Typography>
          </Box>
          <Box display={"flex"} className="bg-green-700 rounded-md mx-5 ">
            
            <Search/>
           
          </Box>
          <Box className="flex justify-between space-x-2 flex-shrink ">
            <button
              className="  text-green-700  bg-white rounded-md px-1 border-2 border-white   "
              onMouseEnter={handleMouseHover}
            >
              <Typography variant="h6">Explore</Typography>
            </button>
            <Menu
              anchorEl={menu}
              keepMounted
              open={Boolean(menu)}
              onClose={handleMouseLeave}
              MenuListProps={{
                onMouseLeave: handleMouseLeave,
              }}
            >
              <MenuList>
                <MenuItem onClick={handleMouseLeave}>Under Construction</MenuItem>
                <MenuItem onClick={handleMouseLeave}>HOME</MenuItem>
                
              </MenuList>
            </Menu>

            <button className="text-green-700 bg-white rounded-md px-1 border-2 border-green-700 hover:bg-green-700 hover:text-white hover:scale-110 transition-transform duration-1000">
                {currentUser ? (
                   <Link to="/account">
                  
                  <Typography> Account<AccountCircleIcon  /> </Typography>
                  </Link>
                  
                  ):(<Typography> Sign In <AccountCircleIcon />
                  </Typography>)
                  }
                   <Link to="/signin">   
                  
                  <Typography> Signin<AccountCircleIcon  /> </Typography>
                  </Link>
                 
              
            </button>

{currentUser ? ( <button className="text-green-700 bg-white rounded-md px-1 border-2 border-green-700 hover:bg-green-700 hover:text-white hover:scale-110 transition-transform duration-1000">
              <Link to="/selleraccount">
                <Typography>
                  Seller Account  <AccountCircleIcon />
                </Typography>
              </Link>
            </button>):( <button className="text-green-700 bg-white rounded-md px-1 border-2 border-green-700 hover:bg-green-700 hover:text-white hover:scale-110 transition-transform duration-1000">
              <Link to="/sellerlogin">
                <Typography>
                  Be a Partner or kart  <AccountCircleIcon />
                </Typography>
              </Link>
            </button>)}

           

            <IconButton   className="text-green-700">
              <ContrastIcon   className="text-black" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
