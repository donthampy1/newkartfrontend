import React, { useState } from 'react';
import { Typography, Slider, InputLabel, Select, MenuItem, Button } from '@mui/material';

function LapTopFilters({ onSubmit }) {

  const [filters, setFilters] = useState({
    priceRange: [10000, 100000],
    brand: '',
    screenSize: '',
    processor: '',
    storage: ''
  });

  const [showFilter, setshowFilter] = useState(false)



  const handlePriceChange = (event, newValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, priceRange: newValue }));
  };
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
  };
  

  return (
    <>
    <div className='flex flex-col  justify-center   '>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center  bg-gray-400 p-3  '>

      <p className=' text-xl font-semibold flex items-center cursor-pointer text-gray-700 gap-2'onClick={()=>setshowFilter(!showFilter)} >LAPTOP FILTERS</p>

      <div className={`border border-gray-300  p-5 py-3 mt-2 ${showFilter ? '':'hidden'} md:block`}>
      <p>Price Range</p>
      <Slider
        value={filters.priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={10000}
        max={100000}
      />
    <Typography>{filters.priceRange[0]}- {filters.priceRange[1]}</Typography>

      <InputLabel id="brand-select-label">Brand</InputLabel>
      <Select
        labelId="brand-select-label"
        name="brand"
        value={filters.brand}
        onChange={handleFilterChange}
      >
        <MenuItem value={null}>select</MenuItem>

        <MenuItem value={'lenovo'}>Lenovo</MenuItem>
        <MenuItem value={'acer'}>Acer</MenuItem>
        <MenuItem value={'asus'}>Asus</MenuItem>
        <MenuItem value={'msi'}>MSI</MenuItem>
        <MenuItem value={'zebronics'}>Zebronics</MenuItem>
      </Select>

      <InputLabel id="screen-size-select-label">Screen Size</InputLabel>
      <Select
        labelId="screen-size-select-label"
        name="screenSize"
        value={filters.screenSize}
        onChange={handleFilterChange}
      >
                <MenuItem value={null}>select</MenuItem>

        <MenuItem value={'14'}>14</MenuItem>
        <MenuItem value={'16'}>16</MenuItem>
        <MenuItem value={'11'}>11</MenuItem>
        <MenuItem value={'13'}>13</MenuItem>
        <MenuItem value={'15'}>15</MenuItem>
      </Select>

      <InputLabel id="processor-select-label">Processor</InputLabel>
      <Select
        labelId="processor-select-label"
        name="processor"
        value={filters.processor}
        onChange={handleFilterChange}
      >
                <MenuItem value={null}>select</MenuItem>

        <MenuItem value={'celeron'}>Celeron</MenuItem>
        <MenuItem value={'i3'}>i3</MenuItem>
        <MenuItem value={'i5'}>i5</MenuItem>
        <MenuItem value={'i7'}>i7</MenuItem>
      </Select>

      <InputLabel id="storage-select-label">Storage</InputLabel>
      <Select
        labelId="storage-select-label"
        name="storage"
        value={filters.storage}
        onChange={handleFilterChange}
      >
                <MenuItem value={null}>select</MenuItem>

        <MenuItem value={'128'}>128</MenuItem>
        <MenuItem value={'256'}>256</MenuItem>
        <MenuItem value={'512'}>512</MenuItem>
        <MenuItem value={'1024'}>1024</MenuItem>
      </Select>
      <Button type="submit">Apply Filters</Button>
      </div>
      </form>
      </div>


    </>
  );
}

export default LapTopFilters;
