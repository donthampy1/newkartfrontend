import React, { useState } from 'react';
import { Typography, Slider, Checkbox, FormControlLabel, Button } from '@mui/material';

function LapTopFilters({ onSubmit, category }) {
  const [filters, setFilters] = useState({
    priceRange: [10000, 100000],
    brand: [], 
    screenSize: [], 
    processor: [], 
    storage: [] 
  });

  const [showFilter, setShowFilter] = useState(false);

  const handlePriceChange = (event, newValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, priceRange: newValue }));
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setFilters((prevFilters) => {

      const currentValues = prevFilters[name] || [];
      //console.log(currentValues)
      if (checked) {
        return { ...prevFilters, [name]: [...currentValues, value] };
      } else {
        return {
       ...prevFilters,
          [name]: currentValues.filter((item) => item !== value)
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtersWithCategory = {
      ...filters,
      category: category, // add category to the filters obj0ect
    };
    onSubmit(filtersWithCategory);
  };

  return (
    <>
      <div className='flex flex-col justify-center'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center bg-gray-400 p-3'>
          <p
            className='text-xl font-semibold flex items-center cursor-pointer text-gray-700 gap-2'
            onClick={() => setShowFilter(!showFilter)}
          >
            LAPTOP FILTERS
          </p>

          <div className={`border border-gray-700 p-5 py-3 mt-2 ${showFilter ? '' : 'hidden'} md:block`}>
            <p className='text-lg'>Price Range</p>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={10000}
              max={100000}
            />
            <Typography>{filters.priceRange[0]} - {filters.priceRange[1]}</Typography>

            <div>
              <p className='text-lg'>Brand</p>
              {['lenovo', 'acer', 'asus', 'msi', 'zebronics','dell','hp'].map((brand) => (
                <FormControlLabel
                  key={brand}
                  control={
                    <Checkbox
                      name="brand"
                      value={brand}
                      checked={filters.brand.includes(brand)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={brand.charAt(0).toUpperCase() + brand.slice(1)}
                />
              ))}
            </div>

            <div>
              <p className='text-lg'>Screen Size</p>
              {[14, 16, 11, 13, 15].map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      name="screenSize"
                      value={size}
                      checked={filters.screenSize.includes(size.toString())}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={`${size}"`}
                />
              ))}
            </div>

            <div>
              <p className='text-lg'>Processor</p>
              {['celeron', 'i3', 'i5', 'i7'].map((processor) => (
                <FormControlLabel
                  key={processor}
                  control={
                    <Checkbox
                      name="processor"
                      value={processor}
                      checked={filters.processor.includes(processor)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={processor.toUpperCase()}
                />
              ))}
            </div>

            <div>
              <p className='text-lg'>Storage</p>
              {[128, 256, 512, 1024].map((storage) => (
                <FormControlLabel
                  key={storage}
                  control={
                    <Checkbox
                      name="storage"
                      value={storage}
                      checked={filters.storage.includes(storage.toString())}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={`${storage}GB`}
                />
              ))}
            </div>

            <button type="submit" className='bg-black  text-white   px-5 py-3 text-md active:bg:gray-700 m-3 ml-0  rounded-sm'>Apply Filters</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LapTopFilters;
