import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 text-gray-700 mt-6 border-t border-gray-300">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Get to Know Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get to Know Us</h3>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-gray-900 transition duration-300">
              Careers
            </a>
            <a href="#" className="hover:text-gray-900 transition duration-300">
              Blog
            </a>
            <a href="#" className="hover:text-gray-900 transition duration-300">
              About Us
            </a>
            <a href="#" className="hover:text-gray-900 transition duration-300">
              Investor Relations
            </a>
          </div>
        </div>

        {/* Contact with Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400 transition duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition duration-300">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Make Money with Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Make Money with Us</h3>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-gray-900 transition duration-300">
              Sell on Our Platform
            </a>
            <a href="#" className="hover:text-gray-900 transition duration-300">
              Become an Affiliate
            </a>
          </div>
        </div>

        {/* Let Us Help You */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Let Us Help You</h3>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-gray-900 transition duration-300">
              Your Account
            </a>
            <a href="#" className="hover:text-gray-900 transition duration-300">
              Your Orders
            </a>
            <a href="#" className="hover:text-gray-900 transition duration-300">
              Shipping & Returns
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="container mx-auto px-6 mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-gray-300 pt-6 text-sm">
        <p className="text-gray-600">© 2025 E-Commerce. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-gray-900 transition duration-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-900 transition duration-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
