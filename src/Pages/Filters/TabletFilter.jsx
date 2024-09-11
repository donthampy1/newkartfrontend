import React, { useState } from 'react';
import { Typography, Slider, Checkbox, FormControlLabel, Button } from '@mui/material';

function MobileFilters({ onSubmit, category }) {
  const [filters, setFilters] = useState({
    priceRange: [5000, 100000],
    brand: [], 
    screenSize: [], 
    ram: [], 
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
            TABLET FILTERS
          </p>

          <div className={`border border-gray-300 p-5 py-3 mt-2 ${showFilter ? '' : 'hidden'} md:block`}>
            <p>Price Range</p>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={5000}
              max={100000}
            />
            <Typography>{filters.priceRange[0]} - {filters.priceRange[1]}</Typography>

            <div>
              <p>Brand</p>
              {['samsung', 'xiaomi','lenovo','honor','oneplus' ].map((brand) => (
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
              <p>Screen Size</p>
              {['11','9','8','12' ].map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      name="screenSize"
                      value={size}
                      checked={filters.screenSize.includes(size)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={`${size}"`}
                />
              ))}
            </div>

            <div>
              <p>Ram</p>
              {['3', '8', '6'].map((ram) => (
                <FormControlLabel
                  key={ram}
                  control={
                    <Checkbox
                      name="ram"
                      value={ram}
                      checked={filters.ram.includes(ram)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={`${ram} GB`}
                />
              ))}
            </div>

            <div>
              <p>Storage</p>
              {['128', '256', '512', '32'].map((storage) => (
                <FormControlLabel
                  key={storage}
                  control={
                    <Checkbox
                      name="storage"
                      value={storage}
                      checked={filters.storage.includes(storage)}
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

export default MobileFilters;
