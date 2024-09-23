import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {useSelector} from 'react-redux'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductPage = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState([]);
  const [image,setImage] = useState('')
  const [imageThumb,setImageThumb] =useState('')

  const { currentUser } = useSelector((state) => state.user)
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)





  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://newkartbackend-1.onrender.com/getproductdata/search?id=${id}`);
        const data = await response.json();
        console.log(data,"thid is working")
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setImage(data.images[0]);
          setImageThumb(data.images[0])
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);
console.log(product,'what now')
console.log(product.category,'what now')



const addToCart = async () => {
  try {


    if (!CartData) {
      toast("Please log in to add items to your cart!");
      return;
    }




console.log(CartData,"newestcartdata")

    const response = await axios.post('https://newkartbackend-1.onrender.com/cart/additems', CartData);
    console.log('Cart data added:', response.data);
    toast("Added To Cart!")
  } catch (error) {
    console.error('Error adding to cart:', error);
  }};

  const CartData = currentUser && currentUser._id ? {
    userId: currentUser._id,
    items: [
      {
        sellerId: product.sellerId,
        productId: product._id,
        productName: product.name,
        productThumbnail: imageThumb,
        productPrice: product.price,
        quantity: 1,
        category: product.category
      }
    ]
  } : null;


console.log(CartData)

if (!product || !product.images) {
  return <div className='mt-20'>Loading...</div>
}

return (
  <div className='transition-opacity ease-in duration-500 opacity-100 mt-16 pt-5'>
    <div className='flex gap-12  sm:12 flex-col sm:flex-row '>
      <div className='flex-1 flex flex-col-reverse md:fl gap-3  sm:flex-row'>
        <div className='flex  sm:flex-col items-center  sm:overflow-y-scroll justify-between sm:justify-normal order-2 md:order-1 sm:order-1 md:w-[8%] lg:w-[8%]   gap-2  w-[20%]'>
          {product.images.map((item, index) => (
            <img src={item} key={index} onClick={()=>setImage(item)} className=' cursor-pointer border p-1'></img>
          ))}
        </div>
        <div className='w-[70%] sm:order-2 md:order-2 order-2  lg:w-[35%] md:w-[40%] sm:w-[80%]   '>
          <img className='w-full border border-t p-1   h-auto' src={image}></img>
        </div>
        <div className='flex-1 sm:order-3 md:order-3'>
        <h1 className={`font-normal text-2xl mt-2 p-3 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
  {product.name}
</h1>
          <div className='flex flex-col  m-2 '>
          {product.brand && (
      <div className="product-ram">
        <p className={`font-medium pl-2 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}
        >Brand: {product.brand} </p> 
      </div>
    )}
    {product.resolution && (
      <div className="product-ram">
        <p  className={`font-medium pl-2 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Resolution: {product.resolution} </p> 
      </div>
    )}

{product.ram && (
      <div className="product-ram">
        <p  className={`font-medium pl-2 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Ram: {`${product.ram} GB`} </p> 
      </div>
    )}
    {product.storage && (
      <div className="product-ram">
        <p  className={`font-medium pl-2 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Storage: {`${product.storage} GB`} </p> 
      </div>
    )}
   

{product.screenSize && (
      <div className="product-ram">
        <p  className={`font-medium pl-2 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Screensize: {`${product.screenSize}"`} </p> 
      </div>
    )}
     {product.batteryCapacity && (
      <div className="product-ram">
        <p  className={`font-medium pl-2 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Battery: {`${product.batteryCapacity} mah`} </p> 
      </div>
    )}
    {product.processor && (
      <div className="product-ram">
        <p  className={`font-medium pl-2 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Processor: {`${product.processor}`} </p> 
      </div>
    )}

    {product.technology && (
      <div className="product-ram">
        <p  className={`font-medium pl-2 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Technology and Certification: {`${product.technology}`} </p> 
      </div>
    )}
    {product.graphicsCard && (
      <div className="product-ram">
        <p  className={`font-medium pl-2 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Graphics: {`${product.graphicsCard}`} </p> 
      </div>
    )}

{product.price && (
      <div className="product-ram">
        <p  className={`font-medium pl-2 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Price: {`${product.price} Rs`} </p> 
      </div>
    )}
    
    

          </div>
          <button onClick={addToCart} className=' bg-black text-white p-3 m-3 mt-4 hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none'>ADD TO CART</button>
          <hr className='mt-2 sm:w-4/5'/>
          <div className='text-sm text-gray-700 pl-3 mt-2 flex flex-col gap-1'>
          <p className={`${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
  100% Original Product
</p>
<p className={`${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
  Top Rated Brand
</p>


          </div>
        </div>
      </div>
      <ToastContainer />

    </div>
    <div className='mt-5'>
        <div className=''>
        <h1 className={`text-sm font-normal md:text-xl lg:text-xl px-5 py-3 ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
  Description:
</h1>
        <p className={`text-sm md:text-xl lg:text-xl px-5 font-normal ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
  {product.description}
</p>

        </div>

      </div>
  </div>
);


  
}

export default ProductPage