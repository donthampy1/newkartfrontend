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


    

  useEffect(() => {
    // Fetch the product data based on the ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cart/search?id=${id}`);
        const data = await response.json();
        setProduct(data.items);
        dispatch(setCartData(data.items))
        console.log(data.items,"thid is working")


        const total = data.items.reduce((sum, item) => sum + item.productPrice, 0);
        setTotalPrice(total);
        
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

console.log(product)

console.log(product)
console.log(totalPrice)

if (!product) {
  console.log('workingggg')
  return <div>Loading...</div>;
}

  return (
    <>
    <div className='mt-20 text-gray-700  '>
       <div className='text-2xl mb-3'>
        <h1>Your Cart</h1>
       </div>
       <div >
       {product.map(item => (

<div key={item.productId} className="  ">

<Card key={item.productId} elevation={1} className="flex flex-row items-center  sm:w-full md:w-full lg:w-4/6  border w-full border-gray-700 p-4 m-2 ">
  <div className="w-[650px] sm:w-[75%]  md:w-[55%] h-auto   ">
    <img  src={item.productThumbnail} alt={item.productName} className=" w-[650px] sm:w-[75%]  md:w-[55%] p-1  h-auto mr-2" />
  </div>
  <div  className="font-normal    text-gray-700 ">
    <h2  >{item.productName}</h2>
    <p>rating: {item.rating}</p>
    <p className='font-medium'>Price: {item.productPrice} rupees</p>
    <p>Quantity: {item.quantity}</p>

  </div>
</Card>

</div>


            ))}

        </div>
        <div className=' flex justify-center my-10 mb-0'>
          <div className='w-[350px]' >

          <div className='text-2xl'>
            <h1 className='ml-3'>CART TOTAL</h1>
          </div>
          <div className='flex flex-col gap-2 ml-3 mt-2 text-sm'>
<div className='flex  justify-between'>
  <p>SUBTOTAL: </p>
  <p className='ml-56'>{totalPrice}</p>
  <hr/>
  </div>
  <hr/>
<div className='flex justify-between'>
  
  <p>Shipping Fee: </p>
  <p>Rs.500</p>

</div>
<hr/>

<div className='flex justify-between'>
  <p>Delivery Fee: </p>
  <p>Rs.500</p>

</div>
<hr/>


<div className='flex justify-between'>
<b>TOTAL:</b>
<b>{totalPrice + 1000}</b>
</div>
</div>
</div>
</div>
<div><div className=' flex pl-[130px] justify-center'>

<button onClick={()=>{navigate('/cart/checkout')}}  className='bg-black  text-white  px-8 py-3 text-sm active:bg:gray-700 m-3  rounded-sm'>PROCEED TO CHECKOUT </button>
          </div>
        </div>

        </div>
        
   
    </>
  )
}

export default CartPage