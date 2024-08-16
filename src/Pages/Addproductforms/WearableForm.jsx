import React from 'react';
import BaseProductForm from './Baseproductform';

const WearableForm = ({ onSubmit, defaultValues }) => (
  <BaseProductForm onSubmit={onSubmit} defaultValues={defaultValues}>
    <div>
      <label>Type</label>
      <input {...register('type', { required: true })} />
      {errors.type && <span>Type is required</span>}
    </div>
    <div>
      <label>Battery Life</label>
      <input {...register('batteryLife', { required: true })} />
      {errors.batteryLife && <span>Battery Life is required</span>}
    </div>
    <div>
      <label>Compatibility</label>
      <input {...register('compatibility', { required: true })} />
      {errors.compatibility && <span>Compatibility is required</span>}
    </div>
    <div>
      <label>Features</label>
      <input {...register('features')} />
    </div>
  </BaseProductForm>
);

export default WearableForm;
