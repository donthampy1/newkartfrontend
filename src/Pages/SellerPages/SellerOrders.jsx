import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



const SellerOrders = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [showFilter, setShowFilter] = useState({})
    const [formData, setFormData] = useState({
      orderStatus: '',
      deliveryDate:'',
    });
    const [filters, setFilters] = useState({
        category: 'Laptop',
        orderStatus: 'Pending',
        paymentStatus: 'Pending'
      });
 



console.log(currentUser._id)
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`https://newkartbackend-1.onrender.com/sellerproduct/searchorders?id=${currentUser._id}`);
            const data = await response.json();
            setProduct(data);
            console.log(data,"this is working")
    
    
             
            setLoading(false); 
    
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
        fetchProduct();
      }, []); 
    console.log(showFilter)


    const showeditDrawer = (id) => {
      setShowFilter((prev)=>({
        ...prev,
        [id]:!prev[id]
      }))
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://newkartbackend-1.onrender.com/sellerproduct/searchorders?id=${currentUser._id}`);
        const data = await response.json();
        setProduct(data);
        console.log(data,"this is working")


         
        setLoading(false); 

      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };



    const handleInputChange = (e) =>{
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
    }
    const handleFilterChange = (e)=>{
        const { name, value } = e.target
        setFilters({...filters, [name]: value })
        console.log(filters)
    }

    const findOrders = async () => {
      console.log(filters, currentUser._id);
    
      try {
        const response = await axios.get(
          `https://newkartbackend-1.onrender.com/sellerproduct/filterproducts`,
          {
            params: {
              id: currentUser._id,
              category: filters.category,
              orderStatus: filters.orderStatus,
              paymentStatus: filters.paymentStatus,
            },
          }
        );
    
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
    
        if (response.data.orders && response.data.orders.length > 0) {
          setProduct(response.data.orders);
          console.log(response.data.orders, "Search performed successfully");
        } else {
          setProduct([]);
          console.log(response.data.message || "No orders found");
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    




    








    const updateProduct = async (id) => {
      console.log(formData)
console.log(id)
      const updateData = new FormData()
      updateData.append('orderStatus',formData.orderStatus)
      updateData.append('deliveryDate',formData.deliveryDate)
      updateData.append('id',id)
      console.log(updateData,"ojf")

      console.log("Product updated successfully");
      

      try {
        console.log("Product updated successfully");

        const response = await axios.put(
          `https://newkartbackend-1.onrender.com/sellerproduct/updateorder?id=${id}`,
          updateData, 
          {
            headers: {
              'Content-Type': 'application/json', 
            },
          }
        );
        


        console.log("Product updated successfully");

        setFormData({
          orderStatus: '',
          deliveryDate:'',
        });
        console.log(formData)

       
        console.log("Product updated successfully");

        if (response.status === 200) {
          console.log("Product updated successfully");
          toast.success("Product Updated!");

        } else {
          console.error("Error updating product:", response.statusText);
          toast('product not updated')

        }
      } catch (error) {
        toast('product not updated')
        console.error("Error updating product:", error);
      }




    }









    if (loading) {
      return <div className="mt-20">Not Found</div>; 
    }

  return (
    <>
    <div className='mt-16 pt-4 ml-1 text-gray-700 m-7 font-normal text-3xl sm:text-3xl lg:text-4xl md:text-4xl'>{currentUser.agencyname}'s Orders</div>
    <ToastContainer />
    <div>
    
    <div className=' mb-9 border border-black sm:w-full md:w-full  lg:w-4/6 ' >
    <div className=" items-center bg-gray-400 w-full border-gray-700 p-4  ">
<p className='text-3xl pb-2'>Find Your Orders</p>
    <div className=' mb-5 bg-black  gap-2'>
          <p className='text-lg mt-1 ml-2 text-white '>Category:</p>
          <select  name="category" value={filters.category} onChange={handleFilterChange} className=' py-2  border border-gray-700 w-full'>
                   <option value="Laptop" >Laptop</option>
                   <option value="Mobile">Mobile</option>
                   <option value="Tablet" >Tablet</option>
                   <option value="Television" >Television</option>

           </select>


          </div>

          <div className=' mb-5 bg-black  gap-2'>
          <p className='text-lg mt-1 ml-2 text-white '>Order  Status:</p>
          <select  name="orderStatus" value={filters.orderStatus} onChange={handleFilterChange} className='x-3 py-2  border border-gray-700 w-full'>
                   <option value="Pending" >Pending</option>
                   <option value="Processing">Processing</option>
                   <option value="Shipped" >Shipped</option>
                   <option value="Delivered" >Delivered</option>

           </select>


          </div>

          <div className=' mb-5 bg-black  gap-2'>
          <p className='text-lg mt-1 ml-2 text-white '>Payment Status:</p>
          <select  name="paymentStatus" value={filters.paymentStatus} onChange={handleFilterChange} className='x-3 py-2  border border-gray-700 w-full'>
                   <option value="Pending" >Pending</option>
                   <option value="Completed">Completed</option>
                   <option value="Failed" >Failed</option>
           </select>


          </div>
<div className='flex justify-end'>
          <button onClick={ findOrders} className='bg-black  text-white px-3 md:px-8 py-3 text-md active:bg:gray-700 m-3  rounded-sm'> SEARCH </button>
          </div>


    </div>






    </div>



    </div>



{product.length === 0 ? (
  <div className='mt-20 text-center  font-medium text-gray-700'>No Orders found</div>
) : (
  product.map(item => (
    <div key={item._id}>
      {item.products.map(prod => (
        <div key={prod.productId} className='mb-9 border border-black sm:w-full md:w-full lg:w-4/6'>
          <div className="flex flex-row items-center border-b gap-2 w-full border-gray-700 p-4">
            <div className="w-[650px] sm:w-[75%] md:w-[55%] h-auto">
              <img src={prod.productThumbnail} alt={prod.productName} className="w-[650px] sm:w-[75%] md:w-[55%] p-1 h-auto mr-2" />
            </div>
            <div className="font-normal  p-3 text-gray-700">
              <h2>{prod.productName}</h2>
              <p className='font-medium'>Price: {prod.productPrice - 1000} rupees</p>
              <div className={` p-2 mt-2 text-center text-white Payment Status: ${item.paymentStatus === 'Pending' ? 'bg-orange-500 ' : item.paymentStatus === 'Completed' ? 'bg-green-800' : item.paymentStatus === 'Failed' ? 'bg-red-800' : 'text-black'}`}>
              <p className={` font-semibold text-base sm:text-lg text-white`} >PaymentStatus: {item.paymentStatus}</p>
              </div>
              <div className={` p-2 mt-2  text-center text-white Order Status: ${item.orderStatus === 'Pending' ? 'bg-red-500 ' : item.orderStatus === 'Processing' ? 'bg-yellow-500' : item.orderStatus === 'Shipped' ? 'bg-blue-800' : item.orderStatus === 'Delivered' ? 'bg-green-800' : 'text-black'}`}>
              <p className={` font-semibold text-base sm:text-lg text-white`}>OrderStatus: {item.orderStatus}</p>
              </div>
              <p className='font-bold mt-2'>Quantity: {prod.quantity}</p>
              {console.log(item._id)}


            </div>
          </div>

          <div className='flex justify-around'>
            <button onClick={() => showeditDrawer(item._id)} className='bg-black text-white px-3 md:px-8 py-3 text-sm active:bg:gray-700 m-3 rounded-sm'>
              {showFilter[item._id] ? 'CLOSE' : ' DETAILS'}
            </button>
           
          </div>

          {console.log(item.shippingDetails.firstName)}
          <div className = {`border-t flex flex-col border-gray-300 p-5 gap-3 py-3 mt-2 ${showFilter[item._id] ? '' : 'hidden'}`}>
            <div className=''>
              <h2 className='text-2xl mt-1'>Shipping Details</h2>
              <p className='text-lg mt-1'> firstname: {item.shippingDetails.firstName}</p>
              <p className='text-lg mt-1'> lastname: {item.shippingDetails.lastName}</p>
              <p className='text-lg mt-1'> phone: {item.shippingDetails.phoneNumber}</p>

              <p className='text-lg mt-1'> email: {item.shippingDetails.email}</p>
              <p className='text-lg mt-1'> street: {item.shippingDetails.streetAddress}</p>


              <p className='text-lg mt-1'> city: {item.shippingDetails.city}</p>
              <p className='text-lg mt-1'> pincode: {item.shippingDetails.pincode}</p>

              <p className='text-lg mt-1'> state: {item.shippingDetails.state}</p>

              <p className='text-lg mt-1'> country: {item.shippingDetails.country}</p>



            </div>
            <div className='flex gap-1 sm:gap-0'>
              <p className='text-lg w-56 text-center  sm:w-36 mt-1 ml-1'>Delivery Date:</p>
              <input name='deliveryDate' type='date' value={formData.deliveryDate} onChange={handleInputChange} className="px-3 py-2 border border-gray-700 w-full" >
            

              </input>
            </div>
            <div className='flex gap-1 sm:gap-0'>
              <p className='text-lg w-48 text-center sm:w-36 mt-1 ml-1'>Order Status:</p>
              <select name='orderStatus' value={formData.orderStatus} onChange={handleInputChange} className="px-3 py-2 border border-gray-700 w-full" >
              <option value="Pending" >Pending</option>
              <option value="Processing">Processing</option>
               <option value="Shipped" >Shipped</option>
               <option value="Delivered" >Delivered</option>





              </select>
            </div>

            <button onClick={() => updateProduct(item._id)} className='hover:bg-black text-black border border-black hover:text-white px-8 py-3 text-md active:bg:gray-700 rounded-sm'>
              UPDATE ORDER STATUS
            </button>
          </div>
        </div>
      ))}
    </div>
  ))
)}


      </>
  )
}

export default SellerOrders