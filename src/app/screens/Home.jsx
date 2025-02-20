import React from "react";
import ProductCard from "../components/productCard/ProductCard";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import products from "../data/products";
const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <header>
        <NavBar />
      </header>
      <main>
        {/* Product Cards */}
        <div className="p-4">
            <ProductCard products={products} />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
