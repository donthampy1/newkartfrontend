import React, { useState } from 'react'
import LapTopFilters from '../Pages/Filters/LapTopFilters'
import { Card } from '@mui/material'

const Filterdrawer = ({ onFilterSubmit }) => {
  
  return (
    <>
    <Card  elevation={1} className='flex flex-col justify-center '>
    <LapTopFilters onSubmit={onFilterSubmit}  />
    </Card>
      </>
  )
}

export default Filterdrawer