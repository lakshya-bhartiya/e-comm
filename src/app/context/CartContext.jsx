import { createContext, useState, useContext } from "react";
import discounts from "../data/discount";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart (or increase quantity)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      const discountData = discounts.find((item) => item.id === product.id);
      const discountPercent = discountData ? discountData.discount : 0;
      const discountedPrice = product.price - (product.price * discountPercent) / 100;
  
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          { ...product, quantity: 1, discount: discountPercent, discountedPrice },
        ];
      }
    });
  };
  

  // Decrease item quantity (or remove if quantity reaches 0)
  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3️⃣ Custom Hook to use Cart Context
export const useCart = () => {
  return useContext(CartContext);
};
