import React from 'react'
import NavBar from '../../components/navBar/NavBar'
import ProductCard from '../../components/productCard/ProductCard'
import Footer from '../../components/footer/Footer'
import womensClothing from '../../data/categories/womensClothing'

const WomensClothing = () => {
  return (
    <div>
        <header>
            <NavBar/>
        </header>
        <main>
            <ProductCard products={womensClothing}/>
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default WomensClothing