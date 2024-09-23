import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setCartData } from '../redux/user/cartSlice';


const CartPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true); 
    const { currentUser } = useSelector((state) => state.user)
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)





    

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://newkartbackend-1.onrender.com/orders/search?id=${id}`);
        const data = await response.json()
        if (data && data.length > 0) {

        setProduct(data);
        dispatch(setCartData(data))
        console.log(data[0].products,"thid is working")


      
        setLoading(false)
        }

      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

console.log(product)

console.log(product)



if (loading) {
  return <div className="mt-20">Not Found</div>; 
}

  return (
    <>
    <div className='mt-16 pt-4 text-gray-700  '>
       <div className='text-2xl mb-3'>
       <h1 className={`${isDarkMode ? 'text-gray-700' : 'text-white'}`}>
  Your Orders
</h1>
       </div>
       <div >
       {product.map(products => (

<div key={products._id} className="  ">
{console.log(products.products[0].productThumbnail)}
<Card key={products.productId} elevation={1} className="flex flex-row items-center  sm:w-full md:w-full lg:w-4/6  border w-full border-gray-700 p-4 m-2 ">
  <div className="w-[650px] sm:w-[75%]  md:w-[55%] h-auto   ">
    <img  src={products.products[0].productThumbnail} alt={products.productName} className=" w-[650px] sm:w-[75%]  md:w-[55%] p-1  h-auto mr-2" />
  </div>
  <div  className="font-normal    text-gray-700 ">
    <h2  >{products.products[0].productName}</h2>
    <p className='font-medium'>Price: {products.products[0].productPrice} rupees</p>
    <p className='font-medium'>Quantity: {products.products[0].quantity}</p>

    <div className={` p-2 mt-2  text-center text-white Order Status: ${products.orderStatus === 'Pending' ? 'bg-red-500 ' : products.orderStatus === 'Processing' ? 'bg-yellow-500' : products.orderStatus === 'Shipped' ? 'bg-blue-800' : products.orderStatus === 'Delivered' ? 'bg-green-800' : 'text-black'}`}>
              <p className={` font-semibold text-base sm:text-lg text-white`}>OrderStatus: {products.orderStatus}</p>
              </div>


  </div>
</Card>

</div>


            ))}

        </div>
        
<div><div className=' flex   justify-center'>

<button onClick={()=>{navigate('/')}}  
className='bg-black  text-white ml-56  px-8 py-5 text-sm active:bg:gray-700 m-3  rounded-sm'>CONTINUE SHOPPING </button>
          </div>
        </div>

        </div>
        
   
    </>
  )
}

export default CartPage