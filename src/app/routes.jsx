import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import SearchResults from "./screens/SearchResults";
import Checkout from "./screens/Checkout";
import OrderHistory from "./screens/OrderHistory";
import WomensClothing from "./screens/categories/WomensClothing";
import MensClothing from "./screens/categories/MensClothing";
import Electronics from "./screens/categories/Electronics"
import Jewellary from "./screens/categories/Jewellary";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "login", element: <Login /> },
  { path: "product/:id", element: <ProductDetails /> },
  { path: "cart", element: <Cart /> },
  {path:"/search", element: <SearchResults/>},
  {path:"/checkout", element: <Checkout/>},
  {path:"/orders", element: <OrderHistory/>},
  {
    path: "category",
    children: [
      {
        path: "electronics",
        element: <Electronics />,
      },
      {
        path: "jewelery",
        element: <Jewellary />,
      },
      {
        path: "men's clothing",
        element: <MensClothing />,
      },
      {
        path: "women's clothing",
        element: <WomensClothing />,
      },
    ],
  },
]);

export default router;
