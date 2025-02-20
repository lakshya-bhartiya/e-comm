import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import ProductDetails from "./screens/productDetails";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Directly assign Home as the element
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "product",
    children: [
      {
        path: ":id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "cart",
    element: <Cart/>
  }
]);

export default router;
