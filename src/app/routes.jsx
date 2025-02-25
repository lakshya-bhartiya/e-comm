import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import SearchResults from "./screens/SearchResults";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "login", element: <Login /> },
  { path: "product/:id", element: <ProductDetails /> },
  { path: "cart", element: <Cart /> },
  {path:"/search", element: <SearchResults/>}
]);

export default router;
