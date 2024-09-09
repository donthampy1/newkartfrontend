import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const TabletForm = ({ category }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError ,reset } = useForm();
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)
  console.log(currentUser._id)




  const onSubmit = async (data) => {
    



    const formData = new FormData();
    
    for (const key in data) {
      if (key === 'images') {
        for (const file of data.images) {
          formData.append('images', file);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    formData.append('category', category);
    formData.append('sellerId', currentUser._id)

    const nameLower = data.name.toLowerCase();

    formData.append('nameLower', nameLower)
    console.log(formData)

    try {
      const response = await axios.post('https://newkartbackend-1.onrender.com/addproducts/tablet/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("this is reply from server", response.data);
      reset()
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("email", { type: "manual", message: err.response.data.message });
      } else {
        console.log('An unexpected error occurred:', err);
      }
    }
  };

  return (
    <form className='border-t flex flex-col  border-gray-300 p-5 gap-3 py-3 mt-2 ' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-2'>
      <p className='text-xl  mt-1'>Name:</p>
        <input className="px-3 py-2 border border-gray-700 w-full" {...register('name', { required: true })} />
      </div>
      {errors.name && <span>Name is required</span>}

      <div className='flex gap-2'>
      <p className='text-xl  mt-1'>Brand:</p>
        <input className="px-3 py-2 border border-gray-700 w-full" {...register('brand', { required: true })} />
      </div>
      {errors.brand && <span>Brand is required</span>}

      <div className='flex gap-2'>
      <p className='text-xl  mt-1'>Price:</p>
        <input className="px-3 py-2 border border-gray-700 w-full" type="number" {...register('price', { required: true })} />
      </div>
      {errors.price && <span>Price is required</span>}

      <div className='flex gap-2'>
      <p className='text-xl  mt-1'>Description:</p>
        <textarea className="px-3 py-2 border border-gray-700 w-full" {...register('description', { required: true })} />
      </div>
      {errors.description && <span>Description is required</span>}

      <div className='flex gap-2'>
      <p className='text-xl  mt-1'>Images:</p>
        <input className="px-3 py-2 border border-gray-700 w-full" type="file" {...register('images', { required: true })} multiple />
      </div>
      {errors.images && <span>Images are required</span>}

      <div className='flex gap-2'>
      <p className='text-xl  mt-1'>Stock:</p>
        <input className="px-3 py-2 border border-gray-700 w-full" type="number" {...register('stock', { required: true })} />
      </div>
      {errors.stock && <span>Stock is required</span>}

      <div className='flex gap-2'>
      <p className='text-xl w-40 mt-1'>Screen Size:</p>
      <input className="px-3 py-2 border border-gray-700 w-full"   {...register('screenSize', { required: true })} />
    </div>
    {errors.screenSize && <span>Screen Size is required</span>}

    
    <div className='flex gap-2'>
    <p className='text-xl  mt-1'>Ram:</p>
    <input className="px-3 py-2 border border-gray-700 w-full"  {...register('ram', { required: true })} />
    </div>
    {errors.ram && <span>Ram is required</span>}

    <div className='flex gap-2'>
    <p className='text-xl  mt-1'>Storage:</p>
    <input className="px-3 py-2 border border-gray-700 w-full" {...register('storage', { required: true })} />
    </div>
    {errors.storage && <span>Storage Capacity is required</span>}

    
      <button type="submit"  className=' w-full bg-black text-white p-2 mt-4 hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none' disabled={isSubmitting}>{isSubmitting ? 'uploading ' : 'upload'} </button>

      <Link to='/selleraccount' >
      <button type="submit"  className=' w-full bg-black text-white p-2 mt-4 hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none' >close </button>

      </Link>
      


    </form>
    
  );
};

export default TabletForm;
