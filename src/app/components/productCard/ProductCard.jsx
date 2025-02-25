import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {

  console.log(products, "products");
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
      {products?.map((product) => (
        <div
          key={product.id}
          className="flex flex-col border border-gray-200 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        >
          {/* Product Image */}
          <div className="w-full h-44 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full  rounded-md"
            />
          </div>

          {/* Product Details */}
          <div className="mt-3">
            <h3 className="text-lg font-medium line-clamp-2">{product.title}</h3>
            <p className="text-blue-600 font-semibold text-lg mt-1">${product.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard