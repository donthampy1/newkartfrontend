import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



const EditproductsPage = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [showFilter, setShowFilter] = useState({})
    const [formData, setFormData] = useState({
      stock: '',
      price: '',
    });
 



console.log(currentUser._id)
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`https://newkartbackend-1.onrender.com/sellerproduct/search?id=${currentUser._id}`);
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
        const response = await fetch(`https://newkartbackend-1.onrender.com/sellerproduct/search?id=${currentUser._id}`);
        const data = await response.json();
        setProduct(data);
        console.log(data,"this is working")


         
        setLoading(false); 

      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };



    const handleInputChange = (e) =>{
      const{ name, value } = e.target
      setFormData({ ...formData, [name]: value })
    }



    const deleteProduct = async (id)=>{
      console.log(id)

      try{

        const response = await axios.delete( `https://newkartbackend-1.onrender.com/sellerproduct/delete?id=${id}`)

        fetchProduct()
        if (response.status === 200) {
          toast.success('Product deleted!');
          
        } else {
          toast.error('Error deleting product.');
        }

      }catch(error) {
        console.log(error)

      }

    }








    const updateProduct = async (id) => {
      console.log(formData)

      const updateData = new FormData()
      updateData.append("stock", formData.stock)
      updateData.append("price", formData.price)
      updateData.append("id", id)
      console.log(updateData,"ojf")

      console.log("Product updated successfully");
      

      try {
        console.log("Product updated successfully");

        const response = await axios.put(
          `https://newkartbackend-1.onrender.com/sellerproduct/update?id=${id}`,
          updateData, 
          {
            headers: {
              'Content-Type': 'application/json', 
            },
          }
        );


        console.log("Product updated successfully");

        setFormData({
          stock: '',
          price: '',
        });
        toast.success("Product Updated!");

        console.log(formData)
        fetchProduct()

       
        console.log("Product updated successfully");

        if (response.status === 200) {
          console.log("Product updated successfully");
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
    <div className='mt-16 pt-4 ml-1 text-gray-700 m-9 font-normal text-3xl sm:text-3xl lg:text-4xl md:text-4xl'>{currentUser.agencyname}'s Products</div>
    <ToastContainer />

    {product.map(item => (
    

      <div key={item._id} >
      
      <div className='mb-9 border border-black sm:w-full md:w-full lg:w-4/6' >

      <div className="flex  flex-row items-center  border-b    gap-2 w-full border-gray-700 p-4  ">
        <div className="w-[650px]   sm:w-[75%]  md:w-[55%] h-auto   ">
          <img  src={item.images[0]} alt={item.name} className=" w-[650px]  sm:w-[75%]  md:w-[55%] p-1  h-auto mr-2" />
        </div>
        <div  className="font-normal    text-gray-700 ">
          <h2  >{item.name}</h2>
          <p>rating: {item.rating}</p>
          <p className='font-medium'>Price: {item.price} rupees</p>
          <p>Stock: {item.stock}</p>
      
        </div>
        </div>
        <div className='flex justify-around'>
        <button  onClick={() => showeditDrawer(item._id)}  className='bg-black  text-white px-3 md:px-8 py-3 text-sm active:bg:gray-700 m-3  rounded-sm'>{showFilter[item._id] ? 'CLOSE    ' : 'EDIT DETAILS'} </button>
        <button onClick={()=>{deleteProduct(item._id)}}  className='bg-red-800  text-white px-3 md:px-8  py-3 text-sm active:bg:gray-700 m-3  rounded-sm'>DELETE PRODUCT </button>

        </div>




        <div className={`  border-t flex flex-col  border-gray-300 p-5 gap-3 py-3 mt-2 ${showFilter[item._id] ? '' : 'hidden'}  `} >
          <div className='flex  gap-2'>
            <p className='text-xl  mt-1'>STOCK:</p>
          <input name='stock' type='number' value={formData.stock} onChange={handleInputChange} className="px-3 py-2  border border-gray-700 w-full"
          ></input>

          </div>
          <div className='flex  gap-2'>
          <p className='text-xl mt-1 ml-2'>PRICE:</p>
          <input name='price' type='number' value={formData.price} onChange={handleInputChange} className="px-3 py-2  border border-gray-700 w-full"
          ></input>
          </div>


        <button onClick={()=>{updateProduct(item._id)}}  className='hover:bg-black  text-black border border-black hover:text-white  px-8 py-3 text-md active:bg:gray-700   rounded-sm'>UPDATE PRODUCT </button>




        
        </div>








      </div>
      
      </div>
      
      
                  ))}
      </>
  )
}

export default EditproductsPage