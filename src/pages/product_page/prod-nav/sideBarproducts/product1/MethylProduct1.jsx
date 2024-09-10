import React from 'react'
import ProdNav from '../../ProdNav'
// import Layout from '../../../../../components/layout/Layout'
import './MethylProduct1.css'

const MethylProduct1 = () => {
  return (
    <div>
      <div className="prod-container">
        <ProdNav />
        <div className="prod-right-content">
          <h1>Methyl Salicylate</h1>
          <p>WINTERGREEN OIL, 2-HYDROXYBENZOIC ACID</p>
          <div className="product1-content">
            <h3>PROPERTIES</h3>
            <p><span>Appearance:</span> Colourless to slight yellow transparent oily liquid.</p>
            <p><span>Assay: </span>99.0% – 100.5%</p>
            <p><span>Odour:</span> Wintergreen Odour</p>
            <p><span>Melting Point:</span> 8.6°C</p>
            <p><span>Boiling Point:</span> 223.3°C</p>
            <p><span>Specific Gravity:</span> 1.180 – 1.185</p>
            <p><span>Refractive Index:</span> 1.534 – 1.538</p>
            <p><span>Solubility in water: </span>0.639 g/L (21 °C)</p>
            <p><span>Solubility:</span> Miscible in diethyl ether, ethanol</p>
            <p><span>Heavy Metals:</span> Max 20 ppm</p>
          </div>
          <div className="product-1-sideimg">
            <img src="../../product-black-svg/methyl-salicylate-diagram-black.svg" alt="" />
          </div>
          <button className='product-1-btn'><a href="/methyl">View Product</a></button>
        </div>
      </div>
    </div>
  )
}

export default MethylProduct1
