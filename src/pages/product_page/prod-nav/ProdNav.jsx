import React from 'react'
import './ProdNav.css'

// import Methyl from '../productList/Methyl'

const ProdNav = () => {
 

  return (
    <div className="product-sidebar">
      <div className='product-widget sidebar-widget widget_nav_menu'>
        <h3>Product List</h3>
        <div className='menu-product-menu-container'>
          <ul className='menu'>
            <li className='menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item current_page_item'>
              <a  href='/product'>Methyl Salicyclate</a>
            </li>
            <li>
              <a href="/product-4">Octyl Salicyclate</a>
            </li>
            <li>
              <a href="/product-2">Salicylic Acid(IP/BP/USP)</a>
            </li>
            <li>
              <a href="/product-3">Salicylic Acid(Technical)</a>
            </li>
            <li>
              <a href="/product-6">Sodium Salicyclate</a>
            </li>
            <li>
              <a href="/product-5">Salicylamide NF</a>
            </li>
            <li>
              <a href="/product-7">Aspirin</a>
            </li>
            <li>
              <a href="/product-8">Homosalate</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProdNav
