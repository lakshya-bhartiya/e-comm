import React from "react";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/productCard/ProductCard";
import products from "../data/products";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.trim().toLowerCase() || "";

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      {/* navBar */}
      <NavBar />
      <h1 className="text-2xl font-bold">Search Results for "{searchQuery}"</h1>
      {/* main content */}
      <main className="flex-grow p-6">
        {filteredProducts.length > 0 ? (
          <div>
            <ProductCard products={filteredProducts} />
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No matching products found.</p>
        )}
      </main>
      {/* footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default SearchResults;
