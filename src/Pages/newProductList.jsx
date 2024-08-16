import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from '@mui/material';
import Filterdrawer from '../components/newFilterdrawer';

const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productsearch/search?q=${searchTerm}`);
        const data = await response.json();
        setProductData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [searchTerm]);
  console.log(productData)

  return (
    <div className="flex">
      <div >
      <Filterdrawer  />
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
