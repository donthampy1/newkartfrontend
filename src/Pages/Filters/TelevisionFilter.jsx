import React, { useState } from 'react';
import { Typography, Slider, Checkbox, FormControlLabel, Button } from '@mui/material';

function MobileFilters({ onSubmit, category }) {
  const [filters, setFilters] = useState({
    priceRange: [5000, 1000000],
    brand: [], 
    screenSize: [], 
    technology: [], 
    resolution: [] 
  })

  const [showFilter, setShowFilter] = useState(false)

  const handlePriceChange = (event, newValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, priceRange: newValue }))
  }

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target
    setFilters((prevFilters) => {
      const currentValues = prevFilters[name] || []
      if (checked) {
        return { ...prevFilters, [name]: [...currentValues, value] }
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
            TELEVISION FILTERS
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
              {['samsung', 'xiaomi', ].map((brand) => (
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
              {['50','32', ].map((size) => (
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
              <p>Technology</p>
              {['HDR10', 'LED'].map((technology) => (
                <FormControlLabel
                  key={technology}
                  control={
                    <Checkbox
                      name="technology"
                      value={technology}
                      checked={filters.technology.includes(technology)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={technology}
                />
              ))}
            </div>

            <div>
              <p>Resolution</p>
              {['4k', '720p', '1080p', '1440p'].map((resolution) => (
                <FormControlLabel
                  key={resolution}
                  control={
                    <Checkbox
                      name="resolution"
                      value={resolution}
                      checked={filters.resolution.includes(resolution)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={resolution}
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
