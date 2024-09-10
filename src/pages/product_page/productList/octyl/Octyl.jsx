import React, {useEffect} from 'react'
import Layout from '../../../../Components/layout/Layout'
import './Octyl.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Octyl = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <Layout>
       <div className="bg-product_2">
        <div className="product_2">
          <div className="product_2-overlay">
            <p>2-ETHYLHEXYL SALICYLATE</p>
            <h2>Octyl Salicylate</h2>
            <img className='octyl' src="../../product-svg/octyl.svg" alt="" />
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
          <p><span>Appearance:</span> Colourless Aromatic Liquid having a strong, persistent and characteristic Odour.</p>
          <p><span>Assay:</span> 95.0% – 105.0%</p>
          <p><span>Specific Gravity:</span> 1.011 – 1.016</p>
          <p><span>Refractive Index:</span> 1.500 to 1.503</p>
          <p><span>Acidity:</span> 0.2 mgKOH/g maximum</p>
          <p><span>Purity (Content of Methyl Salicylate):</span> Minimum 99.0%</p>
        </div>
        <div className="right-side" data-aos="fade-down-left">
          <div>
            <h4>Uses:</h4>
            <p>
            Its primary use is in sunscreens and other cosmetics to absorb UV-B rays from the sun, protecting the skin from damage.
            </p>
          </div>
        </div>
      </section>
      <p className='notes-product_1'><span>NOTE: </span>This product can be manufactured as per customer’s specification and requirements.</p>
    </Layout>
  )
}

export default Octyl
