import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./app/context/CartContext.jsx";
import { AuthProvider } from "./app/context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
        <App/>
    </CartProvider>
  </AuthProvider>
);
