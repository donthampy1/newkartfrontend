import React from 'react';
import { useForm } from 'react-hook-form';

const BaseProductForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name', { required: true })} />
        {errors.name && <span>Name is required</span>}
      </div>
      <div>
        <label>Brand</label>
        <input {...register('brand', { required: true })} />
        {errors.brand && <span>Brand is required</span>}
      </div>
      <div>
        <label>Price</label>
        <input type="number" {...register('price', { required: true })} />
        {errors.price && <span>Price is required</span>}
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description', { required: true })} />
        {errors.description && <span>Description is required</span>}
      </div>
      <div>
        <label>Images</label>
        <input type="file" {...register('images')} multiple />
      </div>
      <div>
        <label>Stock</label>
        <input type="number" {...register('stock', { required: true })} />
        {errors.stock && <span>Stock is required</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BaseProductForm;
