import React from 'react';
import BaseProductForm from './Baseproductform';

const AudioDeviceForm = ({ onSubmit, defaultValues }) => (
  <BaseProductForm onSubmit={onSubmit} defaultValues={defaultValues}>
    <div>
      <label>Type</label>
      <input {...register('type', { required: true })} />
      {errors.type && <span>Type is required</span>}
    </div>
    <div>
      <label>Battery Life</label>
      <input {...register('batteryLife')} />
    </div>
    <div>
      <label>Connectivity</label>
      <input {...register('connectivity', { required: true })} />
      {errors.connectivity && <span>Connectivity is required</span>}
    </div>
    <div>
      <label>Noise Cancelling</label>
      <input type="checkbox" {...register('noiseCancelling')} />
    </div>
  </BaseProductForm>
);

export default AudioDeviceForm;
