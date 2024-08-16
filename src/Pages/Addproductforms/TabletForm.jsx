import React from 'react';
import BaseProductForm from './Baseproductform';

const TabletForm = ({ onSubmit, defaultValues }) => (
  <BaseProductForm onSubmit={onSubmit} defaultValues={defaultValues}>
    <div>
      <label>Screen Size</label>
      <input {...register('screenSize', { required: true })} />
      {errors.screenSize && <span>Screen Size is required</span>}
    </div>
    <div>
      <label>Battery Life</label>
      <input {...register('batteryLife', { required: true })} />
      {errors.batteryLife && <span>Battery Life is required</span>}
    </div>
    <div>
      <label>Storage Capacity</label>
      <input {...register('storageCapacity', { required: true })} />
      {errors.storageCapacity && <span>Storage Capacity is required</span>}
    </div>
    <div>
      <label>Operating System</label>
      <input {...register('operatingSystem', { required: true })} />
      {errors.operatingSystem && <span>Operating System is required</span>}
    </div>
    <div>
      <label>Connectivity</label>
      <input {...register('connectivity')} />
    </div>
  </BaseProductForm>
);

export default TabletForm;