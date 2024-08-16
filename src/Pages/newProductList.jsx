import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from '@mui/material';
import Filterdrawer from '../components/newFilterdrawer';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');
  const filters = useSelector((state) => state.filters.filters);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams({
          q: searchTerm,
          brand: filters.brand,
          screenSize: filters.screenSize,
          processor: filters.processor,
          storage: filters.storage,
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1]
        }).toString();

        const response = await fetch(`http://localhost:3000/productsearch/search?${query}`);
        const data = await response.json();
        setProductData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [searchTerm, filters]);

  return (
    <div className="flex">
      <div>
        <Filterdrawer />
      </div>
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Search Results for: {searchTerm}</h1>
        <div className="flex flex-col gap-4">
          {productData.length > 0 ? (
            productData.map((product) => (
              <div key={product.id} className="flex justify-center">
                <Card elevation={12} className="flex flex-row items-center p-4 w-auto">
                  <div className="flex flex-row w-96">
                    <img src={product.images[0]} alt="" className="w-35 h-auto mr-2" />
                  </div>
                  <div className="font-bold ml-5">
                    <h2>{product.name}</h2>
                    <p>{product.brand}</p>
                    <p>{product.category}</p>
                    <p>Price: {product.price} rupees</p>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
