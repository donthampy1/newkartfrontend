import React, { useState } from 'react'
import LapTopFilters from '../Pages/Filters/LapTopFilters'
import { Card } from '@mui/material'

const Filterdrawer = () => {
  const [filterData, setFilterdata] = useState()
  
  return (
    <>
    <Card  elevation={20} className='p-10 w-96 mt-14'>
    <LapTopFilters filterData={filterData} />
    </Card>
      </>
  )
}

export default Filterdrawer