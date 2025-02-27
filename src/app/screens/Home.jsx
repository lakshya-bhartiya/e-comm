
import Footer from "../components/footer/Footer";
import NavBar from "../components/navBar/NavBar";
import ProductCard from "../components/productCard/ProductCard";
import products from "../data/products";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />
      {/* Main Content */}
      <main className="flex-grow p-6">
            <ProductCard products={products} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
