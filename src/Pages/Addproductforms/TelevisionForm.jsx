import React from 'react';
import BaseProductForm from './Baseproductform';

const TelevisionForm = ({ onSubmit, defaultValues }) => (
  <BaseProductForm onSubmit={onSubmit} defaultValues={defaultValues}>
    <div>
      <label>Screen Size</label>
      <input {...register('screenSize', { required: true })} />
      {errors.screenSize && <span>Screen Size is required</span>}
    </div>
    <div>
      <label>Resolution</label>
      <input {...register('resolution', { required: true })} />
      {errors.resolution && <span>Resolution is required</span>}
    </div>
    <div>
      <label>Smart TV</label>
      <input type="checkbox" {...register('smartTV')} />
    </div>
    <div>
      <label>Connectivity</label>
      <input {...register('connectivity')} />
    </div>
  </BaseProductForm>
);

export default TelevisionForm;
