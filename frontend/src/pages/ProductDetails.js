import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../products';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);
  return <div>{JSON.stringify(product)}</div>;
};

export default ProductDetails;
