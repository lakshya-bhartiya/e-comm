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
    const price =
      item.discountedPrice !== undefined ? item.discountedPrice : item.price;
    return total + price * item.quantity;
  }, 0);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please log in to checkout!");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Failed to load. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_obgigNzKh7TvP7",
      amount: cartTotal * 100,
      currency: "INR",
      name: "E-Commerce Store",
      description: "Order Payment",
      handler: (response) => {
        console.log(response);
        const newOrder = {
          id: Date.now(),
          userEmail: user.email,
          items: cart,
          total: cartTotal.toFixed(2),
          date: new Date().toLocaleString(),
          paymentId: response.razorpay_payment_id,
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem(
          "orders",
          JSON.stringify([...existingOrders, newOrder])
        );

        clearCart();
        toast.success("Payment successful! Order placed.");
        navigate("/orders");
      },
      prefill: {
        name: user.name || "Test User",
        email: user.email || "test@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", (response) => {
      toast.error(`Payment failed: ${response.error.description}`);
    });
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
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-600">
                    {item.quantity} x $
                    {item.discountedPrice?.toFixed(2) || item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-blue-600 font-bold">
                  $
                  {(item.discountedPrice !== undefined
                    ? item.discountedPrice
                    : item.price) * item.quantity}
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
