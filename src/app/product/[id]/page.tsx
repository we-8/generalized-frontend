import React from 'react';
import { ProductDetails,SimilarProducts } from '@/components';
import { BrowserRouter } from 'react-router-dom';


const SingleProduct = () => {
  return (
    <div>
      <BrowserRouter>
        <ProductDetails />
      </BrowserRouter>
    </div>
  );
}

export default SingleProduct;


