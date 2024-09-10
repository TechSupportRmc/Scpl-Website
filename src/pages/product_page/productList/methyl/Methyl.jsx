import React, { useEffect } from 'react'
import Layout from '../../../../Components/layout/Layout'
import './Methyl.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Methyl = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <Layout>
      <div className="bg-product_1">
        <div className="product_1">
          <div className="product_1-overlay">
            <p>WINTERGREEN OIL, 2-HYDROXYBENZOIC ACID</p>
            <h2>Methyl Salicylate</h2>
            <img src="../../product-svg/methyl-salicylate-diagram-black.svg" alt="" />
          </div>
        </div>
      </div>
      <section className="two-column-section">
        <div className='back-link'>
          <a href="/product" style={{ color: 'blue', textDecoration: 'underline' }}>Product Section</a>
          <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Home</a>
        </div>
        <div className="left-side" data-aos="fade-up-right">
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
        <div className="right-side" data-aos="fade-down-left">
          <div>
            <h4>Grades:</h4>
            <p>
              Flavour Grade <br />
              Fragrance Grade <br />
              Pharmaceutical Grade (IP/BP/USP-NF) <br />
              Technical Grade
            </p>
          </div>
          <div>
            <h4>Certifications/Registrations :</h4>
            <p>
              REACH Registration Number: 01-2119515671-44-0005 <br />
              Kosher<br />
              Halal
            </p>
          </div>
          <div>
            <h4>Uses:</h4>
            <p>
              Pharmaceuticals <br />
              Food, Flavours and Fragrances <br />
              Solvents and Intermediates<br />
              Tobacco Industry
            </p>
          </div>
        </div>
      </section>
      <p className='notes-product_1'><span>NOTE: </span>This product can be manufactured as per customer’s specification and requirements (phenol content, impurity limits etc.)</p>
    </Layout>
  )
}

export default Methyl
