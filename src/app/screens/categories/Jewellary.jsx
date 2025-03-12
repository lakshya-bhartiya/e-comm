import React from 'react'
import NavBar from '../../components/navBar/NavBar'
import ProductCard from '../../components/productCard/ProductCard'
import Footer from '../../components/footer/Footer'
import jewelery from '../../data/categories/jewelery'

const Jwellary = () => {
  return (
    <div>
        <header>
            <NavBar/>
        </header>
        <main>
            <ProductCard products={jewelery}/>
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Jwellary