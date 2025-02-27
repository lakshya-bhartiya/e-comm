import React from "react";
import { useCart } from "../context/CartContext";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();

  const cartTotal = cart.reduce((total, item) => {
    const itemPrice = item.discountedPrice ?? item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-md"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-700">
                    <span className="line-through text-gray-500">
                      ${item.price.toFixed(2)}
                    </span>{" "}
                    <span className="text-red-500 font-bold">
                      ${item.discountedPrice?.toFixed(2) || item.price.toFixed(2)}
                    </span>{" "}
                    {item.discount > 0 && (
                      <span className="text-green-500">
                        ({item.discount}% OFF)
                      </span>
                    )}
                  </p>
                  <p className="text-blue-600 font-bold">
                    Total: $
                    {((item.discountedPrice ?? item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    className="bg-gray-300 text-lg px-3 py-1 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    className="bg-gray-300 text-lg px-3 py-1 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Grand Total */}
        {cart.length > 0 && (
          <div className="text-right mt-6 p-4 border-t">
            <h3 className="text-2xl font-bold">Grand Total: ${cartTotal.toFixed(2)}</h3>
            <button
    onClick={() => navigate("/checkout")}
    className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
  >
    Proceed to Checkout
  </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
