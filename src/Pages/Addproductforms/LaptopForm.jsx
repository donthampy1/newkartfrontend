import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LaptopForm = ({ category }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError ,reset } = useForm();
  const navigate = useNavigate();

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

    try {
      const response = await axios.post('http://localhost:3000/addproducts/laptop/add', formData, {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" {...register('name', { required: true })} />
        {errors.name && <span>Name is required</span>}
      </div>
      <div>
        <label>Brand</label>
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" {...register('brand')} />
        {errors.brand && <span>Brand is required</span>}
      </div>
      <div>
        <label>Price</label>
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" type="number" {...register('price', { required: true })} />
        {errors.price && <span>Price is required</span>}
      </div>
      <div>
        <label>Description</label>
        <textarea className="border border-gray-900 rounded-md mx-2 p-1 my-1" {...register('description', { required: true })} />
        {errors.description && <span>Description is required</span>}
      </div>
      <div>
        <label>Images</label>
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" type="file" {...register('images', { required: true })} multiple />
        {errors.images && <span>Images are required</span>}
      </div>
      <div>
        <label>Stock</label>
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" type="number" {...register('stock', { required: true })} />
        {errors.stock && <span>Stock is required</span>}
      </div>
      <div>
        <label>Processor</label>
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" {...register('processor', { required: true })} />
        {errors.processor && <span>Processor is required</span>}
      </div>
      <div>
        <label>RAM</label>
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" {...register('ram', { required: true })} />
        {errors.ram && <span>RAM is required</span>}
      </div>
      <div>
        <label>Storage</label>
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" {...register('storage', { required: true })} />
        {errors.storage && <span>Storage is required</span>}
      </div>
      <div>
        <label>Graphics Card</label>
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" {...register('graphicsCard')} />
      </div>
      <div>
        <label>Screen Size</label>
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" {...register('screenSize', { required: true })} />
        {errors.screenSize && <span>Screen Size is required</span>}
      </div>
      <button type="submit"  className='bg-green-700 text-white p-2 rounded-md' disabled={isSubmitting}>{isSubmitting ? 'uploading ' : 'upload'} </button>

      


    </form>
    
  );
};

export default LaptopForm;
