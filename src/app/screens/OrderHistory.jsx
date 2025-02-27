import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    // Filter orders based on logged-in user
    const userOrders = allOrders.filter(order => order.userEmail === user.email);
    setOrders(userOrders);
  }, [user.email]);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-5">
        <h2 className="text-3xl font-bold mb-5">Your Order History</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">You have no past orders.</p>
        ) : (
          <div className="space-y-5">
            {orders.map(order => (
              <div key={order.id} className="border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
                <p className="text-gray-600">Date: {order.date}</p>
                <p className="text-gray-800 font-bold">Total: ${order.total}</p>
                <ul className="mt-3 space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{item.quantity} x {item.title}</span>
                      <span className="font-bold">${(item.discountedPrice || item.price) * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
