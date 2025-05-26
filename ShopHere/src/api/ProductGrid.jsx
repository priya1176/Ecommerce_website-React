import React from 'react';
import ProductCard from './ProductCard'; 

const ProductGrid = ({ items }) => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-3">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductGrid;
