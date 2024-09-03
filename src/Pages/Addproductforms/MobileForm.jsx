import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MobileForm = ({ category }) => {
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
    const nameLower = data.name.toLowerCase();

    formData.append('nameLower', nameLower)
    console.log(formData)

    try {
      const response = await axios.post('http://localhost:3000/addproducts/mobile/add', formData, {
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
        <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" {...register('brand', { required: true })} />
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
      <label>Screen Size</label>
      <input className="border border-gray-900 rounded-md mx-2 p-1 my-1"   {...register('screenSize', { required: true })} />
      {errors.screenSize && <span>Screen Size is required</span>}
    </div>
    <div>
      <label>Battery Capacity</label>
      <input  className="border border-gray-900 rounded-md mx-2 p-1 my-1"   {...register('batteryCapacity', { required: true })} />
      {errors.batteryLife && <span>Battery Life is required</span>}
    </div>
    <div>
      <label>Camera Specs</label>
      <input className="border border-gray-900 rounded-md mx-2 p-1 my-1"  {...register('cameraSpecs', { required: true })} />
      {errors.cameraSpecs && <span>Camera Specs are required</span>}
    </div>
    <div>
      <label>Storage </label>
      <input className="border border-gray-900 rounded-md mx-2 p-1 my-1" {...register('storage', { required: true })} />
      {errors.storageCapacity && <span>Storage Capacity is required</span>}
    </div>
    
      <button type="submit"  className='bg-green-700 text-white p-2 rounded-md' disabled={isSubmitting}>{isSubmitting ? 'uploading ' : 'upload'} </button>

      


    </form>
    
  );
};

export default MobileForm;
