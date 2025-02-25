import { RouterProvider } from "react-router-dom";
import router from "./app/routes";
import { AuthProvider } from "./app/context/AuthContext";
import { CartProvider } from "./app/context/CartContext";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
