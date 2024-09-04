import React, { useState , useEffect } from 'react'
import {useSelector} from 'react-redux'
import {loadStripe} from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';



const CheckOut = () => {

  const { currentUser } = useSelector((state) => state.user)

  const [buttonSelect,setButtonSelect] = useState('stripe')
  const { id } = useParams()
  const [product, setProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0)
  const total = product || [].reduce((sum, item) => sum + item.productPrice, 0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    email: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phoneNumber: ''
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  


  console.log(formData)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://newkartbackend-1.onrender.com/cart/search?id=${id}`);
        console.log('started')

        const data = await response.json();
        setProduct(data.items);
        console.log(data,"thid is working")


        const total = data.items.reduce((sum, item) => sum + item.productPrice, 0);
        setTotalPrice(total);

      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

console.log(product,'knvkhehnnfvec')

console.log(product)
console.log(totalPrice)








  const makePayment = async ()=>{

    const stripe = await loadStripe('pk_test_51PstSLJfhghqKvcaYBkYe7XqKnqYFOXe58CO8fvaJeohNSgutXeHE4maQ2GeIuZkTGjUjJ26wxaDvoHk7MAdadcQ00wj9AAj6w')
    const body = {
      products : product,
      total : totalPrice ,
      shippingDetails : formData,
      userId :  currentUser._id
    }
    const headers = {
      "Content-Type":"application/json"
    }
    const response = await fetch('http://localhost:3000/checkout/createcheckout',{
      method : "POST",
      headers : headers,
      body : JSON.stringify(body)
    })
    const session = await response.json()
    const result = stripe.redirectToCheckout({
      sessionId : session.id
    })


    if(result.error){
      console.log(result.error)
    }
  }


  return (
    <div className='mt-20 flex flex-col sm:flex-row justify-around gap-4 pt-5 sm:pt-14 min-h-[80vh] '>
    <div className='flex flex-col    gap-4 w-full sm:max-w-[480px]'>
      <div className='text-xl sm:text-2xl my-3' >
        <h1>DELIVERY INFORMATION</h1>
      </div>
      <div className='flex  gap-3'>
      <input type='text'   name='firstName' placeholder='First name'  value={formData.firstName}
  onChange={handleInputChange} className='border border-gray-700 w-full rounded py-1.5 px-3.5'></input>
      <input type='text' placeholder='Last name'  value={formData.lastName}
  onChange={handleInputChange}   name='lastName'  className='border border-gray-700 w-full rounded py-1.5 px-3.5'></input>
      </div>
      <input type='text' placeholder='Street address'   name='streetAddress'   value={formData.streetAddress}
  onChange={handleInputChange} className='border border-gray-700 rounded py-1.5  px-3.5'></input>
      <input type='text'   name='email'  placeholder='Delivery email'  value={formData.email}
  onChange={handleInputChange} className='border border-gray-700 rounded py-1.5 px-3.5'></input>
      <div className='flex gap-3'>
      <input type='text' placeholder='City'   name='city'  value={formData.city}
  onChange={handleInputChange} className='border border-gray-700 rounded py-1.5 w-full px-3.5'></input>
      <input type='text' placeholder='State'   name='state'  value={formData.state}
  onChange={handleInputChange} className='border border-gray-700 rounded py-1.5 w-full px-3.5'></input>
      </div>
      <div className='flex gap-3'>
      <input type='number' placeholder='Pincode'   name='pincode'  value={formData.pincode}
  onChange={handleInputChange} className='border border-gray-700 w-full rounded py-1.5 px-3.5'></input>
      <input type='text' placeholder='Country'   name='country'  value={formData.country}
  onChange={handleInputChange}  className='border border-gray-700 w-full rounded py-1.5 px-3.5'></input>
      </div>
      <div className='flex gap-3'>
      <input type='number' placeholder='Number'   name='phoneNumber'   value={formData.phoneNumber}
  onChange={handleInputChange} className='border border-gray-700 w-full rounded py-1.5 px-3.5'></input>
      <input type='text' placeholder='State'  className='border border-gray-700 rounded w-full py-1.5 px-3.5'></input>
      </div>

    </div>
    <div className='mt-8 '>
      <div className='mt-8  min-w-80'>

      <div className='text-2xl'>
            <h1 className=''>CART TOTAL</h1>
          </div>
          <div className='flex flex-col gap-2  mt-2 text-sm'>
<div className='flex  justify-between'>
  <p>SUBTOTAL: </p>
  <p className='ml-56'>Rs.{totalPrice}.00</p>
  <hr/>
  </div>
  <hr/>
<div className='flex justify-between'>
  
  <p>Shipping Fee: </p>
  <p>Rs.500.00</p>

</div>
<hr/>

<div className='flex justify-between'>
  <p>Delivery Fee: </p>
  <p>Rs.500.00</p>

</div>
<hr/>


<div className='flex justify-between'>
<b>TOTAL:</b>
<b>Rs.{totalPrice + 1000}.00</b>
</div>
</div>
      </div>
      
        <div className='mt-2'>
          <h1 className=' text-2xl'>PAYMENT METHODS </h1>
        <div className='flex gap-3 flex-col justify-between lg:flex-row'>
          <div onClick={()=>setButtonSelect('stripe')} className='flex items-center  gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border ${buttonSelect==='stripe'? 'bg-green-600':''} rounded-full`}></p>
            <img src='https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' className='h-5 mx-4'></img>

          </div>
          <div onClick={()=>setButtonSelect('cod')}  className='flex items-center  gap-3 border p-2 px-3 cursor-pointer'>
          <p className={`min-w-3.5 h-3.5 border rounded-full ${buttonSelect==='cod'? 'bg-green-600':''}`}></p>

<p className='text-gray-700 text-sm font-medium mx-4'> CASH ON DELIVERY</p>
          </div>
          

        </div>
        <div className='w-full  text-end mt-4'
          >
            <button onClick={makePayment} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            
          </div>
      </div>
    </div>
    
    </div>
  )
}

export default CheckOut