import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import { Toaster, toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import products from "../data/products";
import discounts from "../data/discount";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = products.find((item) => item.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error("Product not found!");
      navigate("/");
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You must be logged in to add to cart!");
      return;
    }
    addToCart(product);
    toast.success("Added to Cart!");
  };

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  // Get discount for the product
  const discountData = discounts.find((item) => item.id === product.id);
  const discountPercent = discountData ? discountData.discount : 0;
  const discountedPrice = product.price - (product.price * discountPercent) / 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      <NavBar />

      <div className="flex flex-col md:flex-row items-center mt-10 gap-10 px-6 lg:px-16">
        {/* Product Image & Add to Cart */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-64 h-64 rounded-lg shadow-md" 
          />
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200 text-lg font-semibold shadow-md"
          >
            Add to Cart
          </button>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-gray-800">{product.title}</h3>
          {product.rating && (
            <p className="text-gray-600 mt-1 text-lg">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}
          <p className="text-gray-700 mt-4 leading-relaxed">{product.description}</p>

          {/* Price Section */}
          <div className="mt-4">
            <p className="text-gray-500 text-lg line-through">${product.price.toFixed(2)}</p>
            {discountPercent > 0 ? (
              <p className="text-2xl font-bold text-red-500">
                ${discountedPrice.toFixed(2)}{" "}
                <span className="text-green-500 text-lg">({discountPercent}% OFF)</span>
              </p>
            ) : (
              <p className="text-xl font-bold text-gray-700">No Discount Available</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
