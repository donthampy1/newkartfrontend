import React from 'react';
import MobileForm from './MobileForm';
import LaptopForm from './LaptopForm';
import TabletForm from './TabletForm';
import TelevisionForm from './TelevisionForm';


const ProductForm = ({ category, onSubmit, defaultValues }) => {
  switch (category) {
    case 'Mobile':
      return <MobileForm category={category} onSubmit={onSubmit} defaultValues={defaultValues} />;
    case 'Laptop':
      return <LaptopForm category={category} onSubmit={onSubmit} defaultValues={defaultValues} />;
    case 'Tablet':
      return <TabletForm  category={category} onSubmit={onSubmit} defaultValues={defaultValues} />;
    case 'Television':
      return <TelevisionForm category={category} onSubmit={onSubmit} defaultValues={defaultValues} />;
    
   
    default:
      return null;
  }
};

export default ProductForm;
