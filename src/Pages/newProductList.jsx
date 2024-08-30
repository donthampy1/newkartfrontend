import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from '@mui/material';
import Filterdrawer from '../components/newFilterdrawer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');
  const [productData, setProductData] = useState([]);
  const [filterData, setFilterData] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams({
          q: searchTerm,

        }).toString();
console.log(searchParams,query)
        const response = await fetch(`http://localhost:3000/productsearch/search?${query}`);
        const data = await response.json();
        setProductData(data); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [searchTerm]);



  
  const handleFilterSubmit = (data) => {
    setFilterData(data);
    console.log(data);
    console.log(filterData)
  };





  return (
    <div className="flex flex-col  md:flex-row  gap-5 pt-10  mt-20  ">
      <div className='min-w-48 lg:w-[60%] md:w-[70%]'>
        <Filterdrawer  onFilterSubmit={handleFilterSubmit} />
      </div>
      <div className="flex-grow justify-center items-center  lg:w-[200%] p-4">
        <h1 className="text-2xl text-gray-700 font-normal mb-4">SEARCH RESULTS FOR: "{searchTerm}"</h1>
        <div className="flex flex-col  gap-3">
          {productData.length > 0 ? (
            productData.map((product) => (
              <div key={product.id} className="flex  justify-center  ">
                <Link to={`/product/${product._id}`} className="flex justify-center">

                <Card elevation={1} className="flex flex-row items-center w-full border border-gray-700 p-4  gap-4">
                  <div className="w-[40%]  ">
                    <img src={product.images[0]} alt="" className="  md:w-48  sm:w-64 p-1 h-auto mr-2" />
                  </div>
                  <div className="font-normal  w-[80%]  text-gray-700 ">
                    <h2 >{product.name}</h2>
                    <p>rating: {product.rating}</p>
                    <p>{product.brand}</p>
                    <p>{product.category}</p>
                    <p>Price: {product.price} rupees</p>
                  </div>
                </Card>
                </Link>
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
