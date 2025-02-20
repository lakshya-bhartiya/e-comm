import React from "react";
import { useCart } from "../context/CartContext";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();

  const cartTotal = cart.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-5">
        <h2 className="text-3xl font-bold mb-5">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center gap-5 mb-5">
              <img src={item.image} alt={item.title} className="w-16 h-16" />
              <div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p>
                  <span className="line-through text-gray-500">
                    ${item.price}
                  </span>{" "}
                  <span className="text-red-500 font-bold">
                    ${item.discountedPrice.toFixed(2)}
                  </span>{" "}
                  {item.discount > 0 && (
                    <span className="text-green-500">
                      ({item.discount}% OFF)
                    </span>
                  )}
                </p>
              </div>
              <p className="text-blue-600 font-bold">
                Total: ${(item.discountedPrice * item.quantity).toFixed(2)}
              </p>
              <div className="flex items-center">
                <button
                  className="bg-gray-300 px-2"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  className="bg-gray-300 px-2"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                Remove
              </button>
            </div>
          ))
        )}
        <div className="text-right mt-5 p-4 border-t">
          <h3 className="text-xl font-bold">
            Grand Total: ${cartTotal.toFixed(2)}
          </h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
