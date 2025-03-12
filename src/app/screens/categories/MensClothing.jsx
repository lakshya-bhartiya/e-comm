import React from 'react'
import NavBar from '../../components/navBar/NavBar'
import ProductCard from '../../components/productCard/ProductCard'
import Footer from '../../components/footer/Footer'
import mensClothing from '../../data/categories/mensClothing'

const MensClothing = () => {
  return (
    <div>
        <header>
            <NavBar/>
        </header>
        <main>
            <ProductCard products={mensClothing}/>
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default MensClothing