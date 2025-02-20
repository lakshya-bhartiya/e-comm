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
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = products.find((item) => item.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to add to cart!");
      navigate("/login");
      return;
    }
    addToCart(product);
    toast.success("Added to Cart!");
  };

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  const discountData = discounts.find((item) => item.id === product.id);
  const discountPercent = discountData ? discountData.discount : 0;
  const discountedPrice = product.price - (product.price * discountPercent) / 100;

  return (
    <div>
      <Toaster position="top-center" />
      <NavBar />
      <div className="flex flex-col md:flex-row items-center mt-10 gap-10 px-5">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <img src={product.image} alt={product.title} className="w-64 h-64" />
          <button
            onClick={handleAddToCart}
            className="mt-5 bg-blue-500 text-white py-2 px-5 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-2xl font-bold">{product.title}</h3>
          <p>
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <p className="text-green-600 font-bold">Price: ${product.price}</p>
          <span className="text-red-500 font-bold">
            ${discountedPrice.toFixed(2)}
          </span>{" "}
          {discountPercent > 0 && (
            <span className="text-green-500">({discountPercent}% OFF)</span>
          )}
          <p>{product.description}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
