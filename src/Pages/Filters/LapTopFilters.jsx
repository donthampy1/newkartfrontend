import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Slider, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { setFilters, resetFilters } from '../../redux/user/filterSlice';

function LapTopFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);
  const [value, setValue] = useState(filters.priceRange);

  const handlePriceChange = (event, newValue) => {
    if (newValue[1] - newValue[0] >= 50) {
      setValue(newValue);
      dispatch(setFilters({ priceRange: newValue }));
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFilters({ [name]: value }));
  };

  

  return (
    <>
      <div>LapTopFilters</div>
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={value}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={10000}
        max={100000}
      />
      <Typography>Min: {value[0]}</Typography>
      <Typography>Max: {value[1]}</Typography>

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

    </>
  );
}

export default LapTopFilters;
