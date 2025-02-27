import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import { Toaster, toast } from "react-hot-toast";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const cartTotal = cart.reduce((total, item) => {
    const price = item.discountedPrice !== undefined ? item.discountedPrice : item.price;
    return total + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please log in to checkout!");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const newOrder = {
      id: Date.now(), 
      userEmail: user.email,
      items: cart,
      total: cartTotal.toFixed(2),
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    clearCart(); 
    toast.success("Order placed successfully!");

    navigate("/orders");
  };

  return (
    <div>
      <Toaster position="top-center" />
      <NavBar />
      <div className="container mx-auto p-5">
        <h2 className="text-3xl font-bold mb-5">Checkout</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="border p-4 rounded-lg shadow-md">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-600">
                    {item.quantity} x ${item.discountedPrice?.toFixed(2) || item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-blue-600 font-bold">
                  ${(item.discountedPrice !== undefined ? item.discountedPrice : item.price) * item.quantity}
                </p>
              </div>
            ))}
            <hr className="my-4" />
            <h3 className="text-xl font-bold text-right">
              Total: ${cartTotal.toFixed(2)}
            </h3>
            <button
              onClick={handleCheckout}
              className="w-full mt-5 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
