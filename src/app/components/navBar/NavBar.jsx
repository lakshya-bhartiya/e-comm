import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const NavBar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    navigate(`/search?query=${search.trim()}`);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-100 text-gray-700 shadow-md">
      {/* Left Section: Logo & Home */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-semibold tracking-wide text-gray-800">
          E-Commerce
        </Link>
        <Link to="/" className="text-lg font-medium hover:text-gray-600 transition duration-300">
          Home
        </Link>
        <Link to="/delivery" className="text-lg font-medium hover:text-gray-600 transition duration-300">
          Delivery
        </Link>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 text-gray-700 focus:outline-none w-72"
        />
        <button
          type="submit"
          className=" text-gray-600 px-4 py-2 hover:bg-gray-300 transition duration-300"
        >
          <CiSearch />
        </button>
      </form>

      {/* Right Section: Cart & User */}
      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative text-lg font-medium hover:text-gray-600 transition duration-300">
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-300 text-gray-800 font-bold flex items-center justify-center rounded-full">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={logout}
              className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded-lg transition duration-300 text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
