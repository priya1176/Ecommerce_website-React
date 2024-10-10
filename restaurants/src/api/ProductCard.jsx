import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg shadow-lg p-4 bg-white w-full">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-md font-semibold mb-1">{product.title}</h3>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-lg font-bold mb-4">Price: ${product.price}</p>
            <Link to={`/edit-product/${product.id}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2 w-full">
                    Edit Product
                </button>
            </Link>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
