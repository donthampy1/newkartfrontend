import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from '@mui/material';
import Filterdrawer from '../components/newFilterdrawer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const searchTerm = searchParams.get('search')  
  const searchAuto = searchParams.get('searchterm') 
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)
 

  
  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(true)
  const [category , setCategory] = useState('') 

  useEffect(() => {
    if (searchAuto === null) {

    const fetchData = async () => {
      setLoading(true)
      try {
        const query = new URLSearchParams({
          q: searchTerm,
        }).toString();

        console.log(searchParams,  query);

        const response = await fetch(`https://newkartbackend-1.onrender.com/productsearch/search?${query}`);
        const data = await response.json();
        setProductData(data);
        
        if (data.length > 0) {
          setCategory(data[0].category);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchData()
  }
  }, [searchTerm]);



  useEffect(()=>{

    if (searchTerm === null) {
      console.log(searchAuto," searchAuto running")
    const fetchData = async () => {
      setLoading(true)
      try {
        const query = new URLSearchParams({
          q: searchAuto,
        }).toString();
        console.log( query);


        const response = await fetch(`https://newkartbackend-1.onrender.com/productsearch/searchauto?${query}`)
        const data = await response.json()
        console.log('response recieved',data)
        setProductData(data)


        if (data.length > 0) {
          setCategory(data[0].category);
        }





      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false) // stop loading
      }
    }

    fetchData()
  }
  }, [searchAuto]);
  
console.log(productData)
console.log(category,"category recieved")


  const handleFilterSubmit = async (data) => {
    let filterData = data

    console.log(data);
    console.log(filterData,"data from inside");

    const queryParams = new URLSearchParams()

    if (filterData.priceRange) {
      queryParams.append('minPrice', filterData.priceRange[0]);
      queryParams.append('maxPrice', filterData.priceRange[1]);
    }
    if (filterData.brand) {
      queryParams.append('brand', filterData.brand);
    }
    if (filterData.screenSize) {
      queryParams.append('screenSize', filterData.screenSize);
    }
    if (filterData.processor) {
      queryParams.append('processor', filterData.processor);
    }
    if (filterData.storage) {
      queryParams.append('storage', filterData.storage);
    }

    if (filterData.batteryCapacity) {
      queryParams.append('batteryCapacity', filterData.batteryCapacity);
    }

    if (filterData.ram) {
      queryParams.append('ram', filterData.ram)
    }

    if (category) {
      queryParams.append('category', category)
    }

    if (filterData.technology) {
      queryParams.append('technology', filterData.technology)
    }

    if (filterData.resolution) {
      queryParams.append('resolution', filterData.resolution)
    }




    const queryString = queryParams.toString()
    console.log(queryString,"from querystring")

    try {
      setLoading(true);
      const response = await fetch(`https://newkartbackend-1.onrender.com/productsearch/filter?${queryString}`);
      const filteredData = await response.json();
      setProductData(filteredData);
      console.log(filterData , "from filterdata")
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    





  }


  

  return (
    <div className="flex flex-col  md:flex-row  gap-5 pt-10  mt-16">
      <div className='min-w-48 lg:w-[60%] md:w-[70%]'>
      {category && (
            <div className='min-w-48 lg:w-[100%] md:w-[70%]'>
              <Filterdrawer category={category} onFilterSubmit={handleFilterSubmit} />
            </div>
          )}      </div>
      <div className="flex-grow justify-center items-center  lg:w-[200%] p-4">
        
        <div className='truncate lg:w-3/4'>
        
         {searchAuto === null && (
            <h1 className={`text-xl sm:text-2xl font-normal mb-4 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>

              SEARCH RESULTS FOR: "{searchTerm}"
            </h1>
          )}       
           </div>
        {loading ? ( 
          <p className={`font-semibold ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
  Loading...
</p>
        ) : (
          <div  className="flex flex-col gap-3">
            {productData.length > 0 ? (
              productData.map((product) => (
                <div key={product._id} className="flex justify-center">
                  <Link to={`/product/${product._id}`} className="flex justify-center">
                    <Card elevation={1} className="flex flex-row items-center w-full border border-gray-700 p-4 gap-4">
                      <div className="w-[40%]">
                        <img src={product.images[0]} alt="" className="md:w-48 sm:w-64 p-1 h-auto mr-2" />
                      </div>
                      <div className="font-normal w-[80%] text-gray-700">
                        <h2>{product.name}</h2>
                        <p>Rating: {product.rating}</p>
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
        )}
      </div>
    </div>
  );
};

export default ProductList;
