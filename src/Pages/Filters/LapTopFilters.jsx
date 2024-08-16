import React, { useState } from 'react';
import { Typography, Slider, InputLabel, Select, MenuItem, Button } from '@mui/material';

function LapTopFilters( filterData) {
  const [value, setValue] = useState([10000, 120000]);
  const [brand, setBrand] = useState('lenovo');
  const [screenSize, setScreenSize] = useState('14');
  const [processor, setProcessor] = useState('i5');
  const [storage, setStorage] = useState('256');
  const [filteraData,setFilterdata] = useState('')

  const handlePriceChange = (event, newValue) => {
    if (newValue[1] - newValue[0] >= 50) {
      setValue(newValue);
    }
  };

  const handleSubmit = () => {
    const filters = {
      priceRange: value,
      brand,
      screenSize,
      processor,
      storage,
    };
    setFilterdata(filters);
    console.log(filterData)
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
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        <MenuItem value={'lenovo'}>Lenovo</MenuItem>
        <MenuItem value={'acer'}>Acer</MenuItem>
        <MenuItem value={'asus'}>Asus</MenuItem>
        <MenuItem value={'msi'}>MSI</MenuItem>
        <MenuItem value={'zebronics'}>Zebronics</MenuItem>
      </Select>

      <InputLabel id="screen-size-select-label">Screen Size</InputLabel>
      <Select
        labelId="screen-size-select-label"
        value={screenSize}
        onChange={(e) => setScreenSize(e.target.value)}
      >
        <MenuItem value={'14'}>14</MenuItem>
        <MenuItem value={'16'}>16</MenuItem>
        <MenuItem value={'11'}>11</MenuItem>
        <MenuItem value={'13'}>13</MenuItem>
        <MenuItem value={'15'}>15</MenuItem>
      </Select>

      <InputLabel id="processor-select-label">Processor</InputLabel>
      <Select
        labelId="processor-select-label"
        value={processor}
        onChange={(e) => setProcessor(e.target.value)}
      >
        <MenuItem value={'celeron'}>Celeron</MenuItem>
        <MenuItem value={'i3'}>i3</MenuItem>
        <MenuItem value={'i5'}>i5</MenuItem>
        <MenuItem value={'i7'}>i7</MenuItem>
      </Select>

      <InputLabel id="storage-select-label">Storage</InputLabel>
      <Select
        labelId="storage-select-label"
        value={storage}
        onChange={(e) => setStorage(e.target.value)}
      >
        <MenuItem value={'128'}>128</MenuItem>
        <MenuItem value={'256'}>256</MenuItem>
        <MenuItem value={'512'}>512</MenuItem>
        <MenuItem value={'1024'}>1024</MenuItem>
      </Select>

      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
}

export default LapTopFilters;
