import React from 'react'
import { Link } from "react-router-dom";
import { Typography ,Card} from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Outlet } from 'react-router-dom';


function SellerAccount() {
  return (
      <>
      <button className="text-green-700 bg-white rounded-md px-1 border-2 border-green-700 hover:bg-green-700 hover:text-white hover:scale-110 transition-transform duration-1000">
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