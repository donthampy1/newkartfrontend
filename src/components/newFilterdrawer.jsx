import React, { useState } from 'react'
import LapTopFilters from '../Pages/Filters/LapTopFilters'
import MobileFilters from '../Pages/Filters/MobileFilters'
import { Card } from '@mui/material'

const Filterdrawer = ({ onFilterSubmit, category }) => {
  

  console.log(category, "from new filter drawer")
  switch (category) {
    case 'Mobile':
      return <MobileFilters  category={category} onSubmit={onFilterSubmit}  />;
    case 'Laptop':
      return <LapTopFilters  category={category} onSubmit={onFilterSubmit}  />;
      default:
        return null;
    }





 
  
}

export default Filterdrawer