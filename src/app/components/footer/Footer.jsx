import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = ({ isLoading }) => {
  if (isLoading) {
    return (
      <footer className="bg-gray-100 py-8 text-gray-600">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Skeleton for each section */}
          {[1, 2, 3, 4].map((section) => (
            <div key={section}>
              <Skeleton height={20} width={120} className="mb-2" />
              <div className="flex flex-col gap-2">
                <Skeleton height={16} width="100%" />
                <Skeleton height={16} width="80%" />
                <Skeleton height={16} width="90%" />
                <Skeleton height={16} width="70%" />
              </div>
            </div>
          ))}
        </div>
        <div className="container mx-auto px-4 mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-4">
          <Skeleton height={20} width="50%" />
          <Skeleton height={20} width="30%" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-100 py-8 text-gray-600 mt-4">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Get to Know Us */}
        <div>
          <h3 className="text-lg font-bold mb-2">Get to Know Us</h3>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-gray-800 text-decoration-none">
              Careers
            </a>
            <a href="#" className="hover:text-gray-800 text-decoration-none">
              Blog
            </a>
            <a href="#" className="hover:text-gray-800 text-decoration-none">
              About Us
            </a>
            <a href="#" className="hover:text-gray-800 text-decoration-none">
              Investor Relations
            </a>
          </div>
        </div>

        {/* Contact with Us */}
        <div>
          <h3 className="text-lg font-bold mb-2">Contact with Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Make Money with Us */}
        <div>
          <h3 className="text-lg font-bold mb-2">Make Money with Us</h3>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-gray-800 text-decoration-none">
              Sell products on Amazon
            </a>
            <a href="#" className="hover:text-gray-800 text-decoration-none">
              Become an Affiliate
            </a>
          </div>
        </div>

        {/* Let Us Help You */}
        <div>
          <h3 className="text-lg font-bold mb-2">Let Us Help You</h3>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-gray-800 text-decoration-none">
              Your Account
            </a>
            <a href="#" className="hover:text-gray-800 text-decoration-none">
              Your Orders
            </a>
            <a href="#" className="hover:text-gray-800 text-decoration-none">
              Shipping Policies
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-4">
        <p>© 2025 E-commerce. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
