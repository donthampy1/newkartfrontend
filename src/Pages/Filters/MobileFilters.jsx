import React, { useState } from 'react';
import { Typography, Slider, Checkbox, FormControlLabel, Button } from '@mui/material';

function MobileFilters({ onSubmit, category }) {
  const [filters, setFilters] = useState({
    priceRange: [5000, 100000],
    brand: [], 
    screenSize: [], 
    batteryCapacity: [], 
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
            MOBILE FILTERS
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
              {['itel', 'poco', 'realme', 'lava', 'xiaomi','dell','hp'].map((brand) => (
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
              {['14',' 6.7', '6.6', '6.5', '6.28'].map((size) => (
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
              <p>Battery Capacity</p>
              {['6000', '5000'].map((batteryCapacity) => (
                <FormControlLabel
                  key={batteryCapacity}
                  control={
                    <Checkbox
                      name="batteryCapacity"
                      value={batteryCapacity}
                      checked={filters.batteryCapacity.includes(batteryCapacity)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={batteryCapacity}
                />
              ))}
            </div>

            <div>
              <p>Storage</p>
              {['128', '256', '512', '64'].map((storage) => (
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

            <Button type="submit">Apply Filters</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MobileFilters;
