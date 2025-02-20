import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/apiSlice/store";
import App from "./App.jsx";
import { CartProvider } from "./app/context/CartContext.jsx";
import { AuthProvider } from "./app/context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CartProvider>
  </AuthProvider>
);
