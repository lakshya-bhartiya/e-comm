import React from 'react'
import NavBar from '../../components/navBar/NavBar'
import ProductCard from '../../components/productCard/ProductCard'
import Footer from '../../components/footer/Footer'
import electronics from '../../data/categories/electronics'

const Electronics = () => {
  return (
    <div>
        <header>
            <NavBar/>
        </header>
        <main>
            <ProductCard products={electronics}/>
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Electronics