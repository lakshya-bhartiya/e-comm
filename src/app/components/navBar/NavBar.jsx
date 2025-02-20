import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { FaTruck } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import categories from "../../data/categories";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const {cart} = useCart()
  const {isLoggedIn, logout} = useAuth()

  return (
    <div>
      {/* Navbar */}
      <header className="flex items-center justify-between bg-white shadow-md p-4 mb-4">
        {/* Logo with Home Link */}
        <div className="w-16">
          <Link to="/">
            <img src="../../../public/logo.png" alt="Logo" className="w-full" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <div className="relative">
            <input
              type="text"
              name="searchBar"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          <div className="relative group">
            <Link
              to={"/"}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-lg transition-colors text-decoration-none"
            >
              <FaHome className="text-gray-500" /> Home
            </Link>
          </div>

          {/* Categories Dropdown */}
          <div className="relative inline-block text-left">
            <Menu>
              <Menu.Button className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-lg transition-colors text-decoration-none">
                <BiCategory className="text-gray-500" /> Category
              </Menu.Button>
              <Menu.Items className="absolute mt-2 bg-white shadow-lg rounded w-40 z-10">
                {categories?.map((category, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <Link
                        to={`/category/${category}`}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-gray-700 text-decoration-none`}
                      >
                        {category}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>

          {/* Delivery Link */}
          <Link
            to="/delivery"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-lg transition-colors text-decoration-none"
          >
            <FaTruck className="text-gray-500" />
            Delivery
          </Link>

          {/* Cart Button */}
          <div className="relative group">
            <Link
              to={"/cart"}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-lg transition-colors text-decoration-none"
            >
              <FaShoppingCart className="text-gray-500" /> Cart({cart.length})
            </Link>
          </div>

          {/* Login Dropdown or User Name */}
          {isLoggedIn ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <a href="/login" className="bg-blue-500 px-3 py-1 rounded">Login</a>
        )}
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
